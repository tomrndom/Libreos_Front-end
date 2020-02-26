import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/api/transaction.service';
import { BookService } from 'src/app/services/api/book.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { MessageService } from 'src/app/services/alerts/message.service';
import { UserTransactionService } from 'src/app/services/api/user-transaction.service';
import { AppUserService } from 'src/app/services/api/app-user.service';
import { UserBook } from 'src/app/services/sdk';
import { UserBookService } from 'src/app/services/api/user-book.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-transaction',
  templateUrl: './item-transaction.component.html',
  styleUrls: ['./item-transaction.component.scss'],
})
export class ItemTransactionComponent implements OnInit {

  @Input()
  transaction: any
  @Input()
  itsRequest: boolean
  @Output() emitEvent = new EventEmitter<any>();

  createdCode = null;
  scannedCode = null;
  contact = null;

  constructor(
    private dataService: DataService,
    private _transactionService: TransactionService,
    private _bookService: BookService,
    private _alertService: MessageService,
    private _userTransactionService: UserTransactionService,
    private _userBookService: UserBookService,
    private barcodeScanner: BarcodeScanner,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  updateState(idstate) {
    let update = this.transaction
    update.transactionStateId = idstate
    this._transactionService.update(update).subscribe(
      res => {
        console.log(res)
        if (res.transactionStateId === 1) { //In case Re allow the transaction
          //Block book for future searching
          let book = this.transaction.book
          book.available = 0
          this._bookService.update(book).subscribe(
            res => this.emitEvent.emit(this.itsRequest),
            err => console.log(err)
          )
        }
        if (res.transactionStateId === 21 || res.transactionStateId === 41) {
          //Allow book for future searching
          let book = this.transaction.book
          book.available = 1
          this._bookService.update(book).subscribe(
            res => this.emitEvent.emit(this.itsRequest),
            err => console.log(err)
          )
        }
        this.emitEvent.emit(this.itsRequest);
      });
  }


  completeTransaction() {
    let update = this.transaction
    update.transactionStateId = 31
    this._transactionService.update(update).subscribe(
      (transaction) => {
        console.log('Transaction Complete', transaction)
        this._userTransactionService.getContactDetaild(this.transaction.id).subscribe(
          res => {
            console.log('Contact Detail', res)
            let me_id
            let contact_id
            if (this.itsRequest) {
              me_id = res.toUser.id
              contact_id = res.fromUser.id
            } else {
              me_id = res.fromUser.id
              contact_id = res.toUser.id
            }
            let userBook: UserBook = {
              id: 0,
              bookId: this.transaction.book.id,
              isOwner: 0,
              onHand: 1,
              userId: me_id,
            }
            console.log(userBook)
            console.log(me_id, contact_id)
            this._userBookService.create(userBook).subscribe(
              res => {
                console.log('Create UserBook', res)
                let where = {
                  "where": {
                    "userId": contact_id,
                    "bookId": this.transaction.book.id
                  }
                }
                this._userBookService.findBy(where).subscribe(
                  res => {
                    console.log('Find', res)
                    let updated = res
                    res.onHand = 0
                    this._userBookService.update(updated).subscribe(res => {
                      console.log('User Book Updated', res)
                      let book = this.transaction.book
                      book.available = 0
                      book.reading = 1
                      this._bookService.update(book).subscribe(res => {
                        console.log('Book is Reading', res)
                        this._alertService.presentMessage('Traspaso Exitoso', 'Libro Traspasado con exito!',

                          () => this.emitEvent.emit(this.itsRequest)
                        )
                      })

                    })

                  }
                )
              }
            )
          }
        )

      });
  }

  allowTransaction() {
    this._alertService.presentAlertConfirm('Aceptar Transaccion', 'Esta Seguro?', res => {
      if (res) {
        let update = this.transaction
        update.transactionStateId = 11
        this._transactionService.update(update).subscribe(
          (transaction) =>
            this._alertService.presentMessage('Transaccion Aceptada', 'Se enviaran tus Datos de Contacto',

              () => this.emitEvent.emit(this.itsRequest)
            )
        );
      }
    })
  }
  cancelTransaction(idstate) {
    this._alertService.presentAlertConfirm('Cancelar Transaccion', 'Esta Seguro?', (res) => {
      if (res) {
        let update = this.transaction
        update.transactionStateId = idstate // 41 == cancel 21 == denny
        this._transactionService.update(update).subscribe(
          (transaction) => {
            let book = this.transaction.book
            book.available = 1 //Book Available
            this._bookService.update(book).subscribe(
              res => {
                this._alertService.presentMessage('Transaccion Cancelada', '',

                  () => {
                    this.emitEvent.emit(this.itsRequest)
                  }
                )
              },
              err => console.log(err)
            )
          });
      }
    })

  }


  viewDetailBook() {
    let data = { ...this.transaction.book, itsOwner: !this.itsRequest }
    this.dataService.setData(this.transaction.book.id, data);
    this.navCtrl.navigateForward(`detail-book/${this.transaction.book.id}`)
  }



  showQR() {
    this.createdCode = this.transaction.tokenQr;
    this.checkForScannQr();

  }

  checkForScannQr() {
    let checkQR: Subscription;

    const interval$ = interval(5000);
    const transactionCheck$ = this._transactionService.getById(this.transaction.id);

    checkQR = interval$.pipe(
      switchMap(() => transactionCheck$)
    ).subscribe((res) => {
      console.log('Check if Value Change')
        if (res.transactionStateId === 91) {
          this._alertService.presentMessage('Escaneo Exitoso', 'Ahora Debes compeltar la Transaccion',
            () => {
              this.emitEvent.emit(this.itsRequest)
              checkQR.unsubscribe();
            }
          )
        } else if (res.transactionStateId === 81) {
          this._alertService.presentMessage('Escaneo Fallido', 'Debes Regenerar el QR',
            () => {
              this.emitEvent.emit(this.itsRequest)
              checkQR.unsubscribe();
            }
          )
        }
    });
  }

  hideQR() {
    this.createdCode = null
  }

  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this._transactionService.scanQr(this.transaction.id, barcodeData.text).subscribe(
        res => {
          if (res.transactionStateId === 91) {
            this._alertService.presentMessage('Escaneo Exitoso', 'El Dueño del Libro debe compeltar la Transaccion',

              () => this.emitEvent.emit(this.itsRequest)
            )
          } else if (res.transactionStateId === 81) {
            this._alertService.presentMessage('Escaneo Fallido', 'El Dueño del Libro debe Regenerar el QR',

              () => this.emitEvent.emit(this.itsRequest)
            )
          }
        })
    }).catch(err => {
      console.log(err);
    });
  }

  regenerateQR() {
    this._transactionService.regenerateToken(this.transaction.id).subscribe(
      res => {
        console.log(res)
        this.emitEvent.emit(this.itsRequest)
      })
  }

  getContactDetail() {
    this._userTransactionService.getContactDetaild(this.transaction.id).subscribe(
      res => {
        if (this.itsRequest) {
          this.contact = res.toUser
        } else {
          this.contact = res.fromUser
        }
      }
    )
  }
  hideContactDetail() {
    this.contact = null
  }

}
