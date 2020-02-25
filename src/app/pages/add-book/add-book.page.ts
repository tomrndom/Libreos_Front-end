import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goToScan(){
    this.navCtrl.navigateForward('add-book-scan');

  }

  goToManual(){
    this.navCtrl.navigateForward('add-book-manual');
  }

  goBack(){
    this.navCtrl.back();
  }

}
