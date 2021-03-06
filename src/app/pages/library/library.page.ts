import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BookService } from '../../services/api/book.service';
import { AppUserService } from '../../services/api/app-user.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  userId: number
  bookList: [] = [];

  constructor(
    private _userService: AppUserService,
    private navCtrl: NavController,
    private storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.userId = JSON.parse(val).id
      this.getBooks(this.userId)
    });

  }
  goBack() {
    this.navCtrl.back();
  }
  goToAddBook() {
    this.navCtrl.navigateForward('add-book');
  }

  getBooks(id) {
    this._userService.getUserBooks(id).subscribe(
      res => {
        this.bookList = res
      },
      err => {

      });
  }

  updateItem($event) {
    console.log('EVENTO', $event)
    this.getBooks(this.userId)
  }
}