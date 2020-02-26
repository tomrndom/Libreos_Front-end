import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-start-guide',
  templateUrl: './start-guide.page.html',
  styleUrls: ['./start-guide.page.scss'],
})
export class StartGuidePage {

  constructor(
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  goToHome() {
    this.storage.set('tutorial_done', true);
    this.navCtrl.navigateForward('home');
  }

}
