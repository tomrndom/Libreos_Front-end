import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, Transaction, UserTransaction } from 'src/app/services/sdk';
import { NavController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/api/transaction.service';
import { BookService } from 'src/app/services/api/book.service';
import { UserTransactionService } from 'src/app/services/api/user-transaction.service';
import { AppUserService } from 'src/app/services/api/app-user.service';
import { MessageService } from 'src/app/services/alerts/message.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {
  book: Book = {
    "id": 0,
    "title": '',
    "isbn": '',
    "publisher": '',
    "language": '',
    "authors": '',
    "synopsys": '',
    "pages": 0,
    "genderId": 0,
    "image": 'https://image.shutterstock.com/image-vector/no-image-available-sign-internet-600w-261719003.jpg',
    "available": 1
  };
  user: any = {
  }
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private _transactionService: TransactionService,
    private _userTransactionService: UserTransactionService,
    private _bookService: BookService,
    private _alertService: MessageService,
    private _AppUserService: AppUserService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      let getBook = this.route.snapshot.data['special']
      this.book = getBook ? getBook : this.book;
      console.log(this.book)
    }
    this._AppUserService.user.then((user) => {
      this.user = JSON.parse(user)
    });

  }

  goBack() {
    this.navCtrl.back();
  }

  requestBook() {
    this._alertService.presentAlertConfirm('Solicitar Libro', 'Esta Seguro?', (res) => {
      if (res) {
        let transaction: Transaction = {
          id: 0,
          bookId: this.book.id,
          transactionStateId: 1
        }
        this._transactionService.create(transaction).subscribe(
          res => {
            console.log("Transaction", res);
            this.book.available = 0;
            this._bookService.update(this.book).subscribe(
              res => {
                console.log('Book', res)
              })
            let userTransaction: UserTransaction = {
              id: 0,
              fromUserId: this.user.id,
              toUserId: this.book.userBooks[0].userId,
              transactionId: res.id
            }
            this._userTransactionService.create(userTransaction).subscribe(
              res => {
                console.log(res)
                this._alertService.presentMessage('Libro Solicitado', 'Podras ver El estado de Tu Solicitud en Solicitudes')
              }
            )
          },
          err => {
            this._alertService.presentAlert(err)
            console.log(err);
          })
      } else {
        console.log('Solicitud Cancelada')
      }
    })

  }
}
