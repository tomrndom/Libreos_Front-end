import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/api/transaction.service';
import { BookService } from 'src/app/services/api/book.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { MessageService } from 'src/app/services/alerts/message.service';

@Component({
  selector: 'app-item-transaction',
  templateUrl: './item-transaction.component.html',
  styleUrls: ['./item-transaction.component.scss'],
})
export class ItemTransactionComponent implements OnInit {
  a
  @Input()
  transaction: any
  @Input()
  itsRequest: boolean


  createdCode = null;
  scannedCode = null;

  constructor(
    private dataService: DataService,
    private _transactionService: TransactionService,
    private _bookService: BookService,
    private _alertService: MessageService,
    private barcodeScanner: BarcodeScanner,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    console.log(this.itsRequest)
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
            res => window.location.reload(),
            err => console.log(err)
          )
        }
        if (res.transactionStateId === 21 || res.transactionStateId === 41) {
          //Allow book for future searching
          let book = this.transaction.book
          book.available = 1
          this._bookService.update(book).subscribe(
            res => window.location.reload(),
            err => console.log(err)
          )
        }
        window.location.reload();
      });
  }


  allowTransaction() {
    this._alertService.presentAlertConfirm('Aceptar Transaccion', 'Esta Seguro?', (res) => {
      if (res) {
        let update = this.transaction
        update.transactionStateId = 11
        this._transactionService.update(update).subscribe(
          () => window.location.reload()
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
          () => {
            let book = this.transaction.book
            book.available = 1
            this._bookService.update(book).subscribe(
              res => {
                this._alertService.presentMessage('Transaccion Aceptada', 'Se enviaran tus datos de contacto al solicitante',

                  () => window.location.reload()
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
    this.checkForScannQr()

  }

  checkForScannQr() {
    setTimeout(
      () => {
        console.log('Check every 5 second')
        this._transactionService.getById(this.transaction.id).subscribe(
          res => {
            console.log('Check if Value Change')
            if (res.transactionStateId === this.transaction.transactionStateId) {
              this.checkForScannQr();
            } else {
              if (res.transactionStateId === 91) {
                this._alertService.presentMessage('Escaneo Exitoso', 'Ahora Debes compeltar la Transaccion',

                  () => window.location.reload()
                )
              } else if (res.transactionStateId === 81) {
                this._alertService.presentMessage('Escaneo Fallido', 'Debes Regenerar el QR',

                  () => window.location.reload()
                )
              }
            }
          }
        )
      }, 5000)

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

              () => window.location.reload()
            )
          } else if (res.transactionStateId === 81) {
            this._alertService.presentMessage('Escaneo Fallido', 'El Dueño del Libro debe Regenerar el QR',

              () => window.location.reload()
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
      })
  }

}
