import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public alertController: AlertController) { }

  async presentAlert(e) {
    const alert = await this.alertController.create({
      header: e.name,
      subHeader: '',
      message: e.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async signUp() {
    const alert = await this.alertController.create({
      header: "Registro",
      subHeader: '',
      message: "Registro Exitoso, Inicia Sesion",
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentMessage(title: string, message: string, handler: any = null) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: '',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (handler) {
              handler(true)
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertConfirm(title: string, message: string, handler: any) {

    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => handler(false)
        }, {
          text: 'Aceptar',
          handler: () => handler(true)
        }
      ]
    });

    return alert.present();
  }

  async editUser() {
    const alert = await this.alertController.create({
      header: "",
      subHeader: '',
      message: "!El Perfil se ha Actualizado con exito",
      buttons: ['OK']
    });

    await alert.present();
  }


}
