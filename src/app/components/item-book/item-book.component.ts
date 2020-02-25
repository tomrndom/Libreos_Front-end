import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';
import { BookService } from 'src/app/services/api/book.service';

@Component({
  selector: 'app-item-book',
  templateUrl: './item-book.component.html',
  styleUrls: ['./item-book.component.scss'],
})
export class ItemBookComponent implements OnInit {

  @Input()
  book:any

  @Input()
  itsOwner = false

  constructor(
              private _bookService:BookService,
              private router: Router, 
              private dataService: DataService,
              public navCtrl:NavController) { }

  ngOnInit() {
    console.log(this.book)
  }

  redirecToAddBook(){

  }

  viewDetailBook(){
    
    let data = {...this.book,itsOwner: this.itsOwner}
    this.dataService.setData(this.book.id, data);
    this.navCtrl.navigateForward(`detail-book/${this.book.id}`)
    // this.router.navigateByUrl();
    
  }
  //Change book now its available
  finishBook(){
    let update = this.book
    update.available = 1
    this._bookService.update(update).subscribe(res => console.log(res));
  }
}
