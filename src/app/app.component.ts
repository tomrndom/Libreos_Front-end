import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MessageService } from 'src/app/services/alerts/message.service';
import { AppUserService } from 'src/app/services/api/app-user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Mis libros',
      url: '/library',
      icon: 'book'
    },
    {
      title: 'Agregar un libro',
      url: '/add-book',
      icon: 'add-circle'
    },
    {
      title: 'Buscar libros',
      url: '/search-book',
      icon: 'locate'
    },
    {
      title: 'Solicitudes',
      url: '/transaction',
      icon: 'briefcase'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrll: NavController,
    private _alertService: MessageService,
    private _AppUserService: AppUserService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    console.log('Cerrar Sesion')
    this._alertService.presentAlertConfirm('Cerrar Sesion', 'Esta Seguro?', res => {
      if (res) {
        this._AppUserService.logout()
        this.navCtrll.navigateRoot('login')
      }
    })
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
