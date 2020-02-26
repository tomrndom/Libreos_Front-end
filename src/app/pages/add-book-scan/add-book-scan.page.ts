import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BookService } from 'src/app/services/api/book.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-book-scan',
  templateUrl: './add-book-scan.page.html',
  styleUrls: ['./add-book-scan.page.scss'],
})
export class AddBookScanPage implements OnInit {

  isbn = ""
  message = ""
  book:any
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private _bookService: BookService,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  // regex isbn (?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)

  scanISBN() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this._bookService.getByIsbn(barcodeData.text).subscribe(
        res => {                    
          if(res) {
            console.log(res)
            this.message = ""
            let data = {...res}
            this.dataService.setData(0, data);
            this.navCtrl.navigateForward(`add-book-manual/0`)            
          }else{
            this.message = "No se Encontro Libro REVISE ISBN O pruebe cargando manualmente";
          }
        }
      ), (err) => {
        console.log(err);
        this.message = "Ha ocurrido un error al intentar obtener los datos, inténtelo nuevamente";
      }
     }).catch(err => {
        console.log(err);
        this.message = "No se Encontro Libro REVISE ISBN O pruebe cargando manualmente";
     });
  }

  onEnter() {
    if (!this.isbn.length) {
      this.message = "Ingrese Nro de ISBN"
      this.book = {}
    } else {
  
      this._bookService.getByIsbn(this.isbn).subscribe(
        res => {
          
          
          if(res) {
            console.log(res)
            this.message = ""
            let data = {...res}
            this.dataService.setData(0, data);
            this.navCtrl.navigateForward(`add-book-manual/0`)
            
          }else{
            this.message = "No se Encontro Libro REVISE ISBN O pruebe cargando manualmente"
          }
        }
      )

    }
  }


  viewDetailBook(){
    
   
    // this.router.navigateByUrl();
    
  }
  goBack(){
    this.navCtrl.back()
  }

}
