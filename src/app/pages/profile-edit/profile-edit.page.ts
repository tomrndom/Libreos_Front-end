import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppUserService } from 'src/app/services/api/app-user.service';
import { MessageService } from 'src/app/services/alerts/message.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  user: any = {
    id: 0,
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    username: ''
  }

  constructor(
    private _AppUserService: AppUserService,
    private _alertService: MessageService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this._AppUserService.user.then((user) => {
      this.user = JSON.parse(user)
    });
  }

  goBack() {
    this.navCtrl.back()
  }

  updateUser() {
    console.log(this.user)
    this._alertService.presentAlertConfirm('Actualizar Mi Perfil', '¿Esta Seguro?', (res) => {
      if (res) {
        this._AppUserService.updateUser(this.user).subscribe(
          res => {
            this._AppUserService.setUser(res)
            this._alertService.presentMessage('', '!El Perfil se ha Actualizado con exito', () => {
              this.navCtrl.navigateForward('profile')
            })

          },
          err => {
            this._alertService.presentAlert(err)
          }
        )
      }
    })

  }
}
