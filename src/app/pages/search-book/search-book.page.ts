import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BookService } from 'src/app/services/api/book.service';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { LoopBackFilter } from 'src/app/services/sdk';
import { LocationService } from 'src/app/services/api/location.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.page.html',
  styleUrls: ['./search-book.page.scss'],
})
export class SearchBookPage implements OnInit {
  userId: number
  searchTerm = ""
  message = ""
  range: number;
  bookList: any[] = []

  constructor(
    private _bookService: BookService,
    private _locationService: LocationService,
    private dataService: DataService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.userId = JSON.parse(val).id
    })
  }

  async searchBooks(postalCode: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando...',
    });
    await loading.present();

    let filter: LoopBackFilter = {
      "where": {
        "and": [
          { "cityCP": 5500 },
          { "userId": { "neq": this.userId } },
        ]
      },
      "include": [{
        "relation": "user", "scope": {
          "include": {
            "relation": "userBooks",
            "scope": {
              "where": { "onHand": "1" },
              "include": { "relation": "book", "scope": { "where": { "available": "1" } } }
            }
          }
        }
      }]
    }


    this._locationService.getAll(filter).subscribe((res: any) => {
      console.log('RESPUESTA', res)
      res.map(i => {
        i.user.userBooks.map(book => {
          if (book.book) {
            this.bookList.push(book.book);
          }
        });
      });
      if (this.bookList.length === 0) this.message = "No se encontraron resultados";
      loading.dismiss();
    });
  }

  onEnter() {

    if (!this.searchTerm.length) {
      this.message = "Ingrese Termino de busqueda"
      this.bookList = []
    } else {
      let filter = {
        "where": {
          "and": [
            {
              "or": [{ "title": { like: `%${this.searchTerm}%` } }, { "authors": { like: `%${this.searchTerm}%` } }]
            },
            {
              "available": "1"
            },
            {
              "deletedAt": null
            }
          ]
        },
        "include": [
          { "relation": "userBooks", "scope": { "where": { userId: { neq: `${this.userId}` } } } },
          ['gender', { 'bookConditions': 'condition' }]
        ]
      }

      this._bookService.getAllBooks(filter).pipe(
        map(book => book.filter(item => item.userBooks.length > 0))
      ).subscribe(
        res => {

          this.message = ""
          this.bookList = res
          console.log(this.bookList)
          if (!this.bookList.length) {
            this.message = "No se encontraron resultados"
          }
        }
      )

      // this._bookService.getAllBooks(filter).subscribe(
      //   res => {

      //     this.message = ""
      //     this.bookList = res
      //     console.log(this.bookList)
      //     if (!this.bookList.length) {
      //       this.message = "No se encontraron resultados"
      //     }
      //   }
      // )
    }
  }

  goBack() {
    this.navCtrl.back()
  }
}
