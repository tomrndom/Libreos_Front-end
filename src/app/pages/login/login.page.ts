import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AppUserService } from '../../services/api/app-user.service';
import { MessageService } from 'src/app/services/alerts/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  

  user: string = null;  
  password: string = null;

  constructor(
    private _appUserService: AppUserService,
    private _alertService: MessageService,
    public navCtrl: NavController,
  ) { }  

  ngOnInit() {
  }

  register(){
    this.navCtrl.navigateForward('sign-up')
  }

  login() {
    console.log('params', this.user, this.password);
    this._appUserService.login(this.user, this.password)
      .subscribe((rs) => {
        console.log(rs)
        this.navCtrl.navigateRoot('home');
      }, err => {
        console.log('error login', err);
        this._alertService.presentAlert(err);
      });
  }

  // TODO: Set this kind of error management in a service


}
