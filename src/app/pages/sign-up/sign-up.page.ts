import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppUserService } from 'src/app/services/api/app-user.service';
import { MessageService } from 'src/app/services/alerts/message.service';
import { LocationService } from 'src/app/services/api/location.service';
import { Location } from 'src/app/services/sdk';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  user: any = {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    emailVerified: false,
    password: '',
    confirmPassword: '',
    phone: ''
  }
  passwordMessage = ""

  constructor(
    public navCtrll: NavController,
    private _alertService: MessageService,
    private _locationService: LocationService,
    private _userService: AppUserService
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrll.back();
  }

  register() {
    console.log(this.validatePasswords())
    if (this.validatePasswords()) {
      let user = { ...this.user, confirmPassword: undefined }
      this._userService.createUser(user).subscribe(
        res => {
          console.log('User Creado', res)
          let location: Location = {
            id: 0,
            latitude: '0',
            longitude: '0',
            cityCp: 5500,
            userId: res.id
          }
          this._locationService.create(location).subscribe(
            res => {
              console.log('Location Creada', res)
              this._userService.login(this.user.username, this.user.password)
                .subscribe(
                  (res) => {
                    console.log('User Login', res)
                    this._alertService.signUp()
                    this.navCtrll.navigateForward('start-guide');
                  });
            })

        },
        err => {
          this._alertService.presentAlert(err)
          console.log(err);
        }
      )
    }
  }

  validatePasswords() {
    //Password must be between 6 and 12 characters with at least one capital letter, one small letter, and one digit.
    //this.user.password.match(('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$'))
    if (this.user.password.length < 6 || this.user.password.length > 12) {
      this.passwordMessage = "La Contraseña debe tener entre 6 y 12 caracteres"
      return false
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMessage = "Las Contraseñas no coinciden"
      return false
    } else {
      this.passwordMessage = ""
      return true
    }

  }

}
