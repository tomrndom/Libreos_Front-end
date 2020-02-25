import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BookService } from 'src/app/services/api/book.service';
import { UserBookService } from 'src/app/services/api/user-book.service';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.page.html',
  styleUrls: ['./search-book.page.scss'],
})
export class SearchBookPage implements OnInit {
  userId: number
  searchTerm = ""
  message = "Ingrese Termino de Busqueda"
  bookList: any[] = []
  
  constructor(
    private _bookService: BookService,
    private navCtrl:NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.userId = JSON.parse(val).id
    })
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
            ['gender' ,{'bookConditions':'condition'} ]
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

  goBack(){
    this.navCtrl.back()
  }
}
