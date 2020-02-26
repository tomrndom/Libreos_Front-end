import { Component } from '@angular/core';

import { NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-start-guide',
  templateUrl: './start-guide.page.html',
  styleUrls: ['./start-guide.page.scss'],
})
export class StartGuidePage {

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private storage: Storage
  ) { }

  goToHome() {
    this.storage.set('tutorial_done', true);
    this.menuCtrl.enable(true);
    this.navCtrl.navigateForward('home');
  }

}
