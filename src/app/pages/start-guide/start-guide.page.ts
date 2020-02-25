import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start-guide',
  templateUrl: './start-guide.page.html',
  styleUrls: ['./start-guide.page.scss'],
})
export class StartGuidePage {

  constructor(
    private navCtrl: NavController
  ) { }

  goToHome() {
    this.navCtrl.navigateForward('home');
  }

}
