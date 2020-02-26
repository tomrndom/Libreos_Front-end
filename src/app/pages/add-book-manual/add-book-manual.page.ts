import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

//Services
import { GenderService } from '../../services/api/gender.service'
import { Gender, Book, BookCondition, Condition, UserBook } from '../../services/sdk';
import { ConditionService } from '../../services/api/condition.service';
import { BookService } from '../../services/api/book.service';
import { BookConditionService } from '../../services/api/book-condition.service';
import { UserBookService } from '../../services/api/user-book.service';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/alerts/message.service';

@Component({
  selector: 'app-add-book-manual',
  templateUrl: './add-book-manual.page.html',
  styleUrls: ['./add-book-manual.page.scss'],
})
export class AddBookManualPage implements OnInit {
  userId: number
  genders: Gender[]
  conditions: Condition[]
  bookCondition: BookCondition = {
    "id": 0,
    "bookId": 0,
    "conditionId": 0,
    "personalOpinion": ''
  }
  book: Book = {
    "id": 0,
    "title": '',
    "isbn": '',
    "publisher": '',
    "language": '',
    "authors": '',
    "synopsys": '',
    "reading":0,
    "pages": 0,
    "genderId": 0,
    "image": 'https://image.shutterstock.com/image-vector/no-image-available-sign-internet-600w-261719003.jpg',
    "available": 1
  }

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private _genderService: GenderService,
    private _conditionService: ConditionService,
    private _bookService: BookService,
    private _bookConditionService: BookConditionService,
    private _userBookService: UserBookService,
    private _alertService: MessageService,
    private storage: Storage
  ) {
    storage.get('user').then((val) => {
      this.userId = JSON.parse(val).id
    });

    if (this.route.snapshot.data['special']) {
      let getBook = this.route.snapshot.data['special'];
      this.book.title = getBook.title
      this.book.image = getBook.image
      this.book.isbn = getBook.isbn13 ? getBook.isbn13 : getBook.isbn
      this.book.authors = getBook.authors.toString()
      this.book.synopsys = getBook.synopsys ? getBook.synopsys : ''
      this.book.publisher = getBook.publisher
      this.book.pages = getBook.pages

    }
  }

  ngOnInit() {
    this._genderService.getAll().subscribe(genders => {
      this.genders = genders;
    });

    this._conditionService.getAll().subscribe(conditions => {
      this.conditions = conditions;
    });
  }

  newBook() {
    this._bookService.create(this.book).subscribe(
      res => {
        console.log("Libro", res);
        this.bookCondition.bookId = res['id']
        this._bookConditionService.create(this.bookCondition).subscribe(
          res => {
            console.log("BookCondition", res);
          },
          err => {
            console.log("Error", err)
          });

        let userBook: UserBook = {
          "id": 0,
          "isOwner": 1,
          "onHand": 1,
          "bookId": res['id'],
          "userId": this.userId
        }
        this._userBookService.create(userBook).subscribe(
          (res) => {
            console.log(res)
            this.navCtrl.navigateForward('library')
            console.log('Redirect_')
          });
      },
      err => {
        this._alertService.presentAlert(err)
        console.log(err);
        console.log("Error", err)
      });

  }


  goBack() {
    this.navCtrl.back()
  }
}
