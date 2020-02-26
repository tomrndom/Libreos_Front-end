import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppUserService } from 'src/app/services/api/app-user.service';
import { interval, Subscription, Observable } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  location: any = {
    latitude: null,
    longitude: null
  }

  interval$ = interval(300000);
  firstTime$ = interval(500);
  getPosition$;
  watchPosition$: Subscription;
  updatePosition$: Observable<Location>;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private storage: Storage,    
    private router: Router,
    public geolocation: Geolocation,
    private _AppUserService: AppUserService,
  ) {
    this.getPosition$ = this.geolocation.getCurrentPosition();
    this.updatePosition$ = this._AppUserService.putLocation(this.location);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.    
    this.watchPosition$.unsubscribe();    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.openTutorial();
    // First time update
    this.firstTime$.pipe(
      take(1),
      switchMap(() => this.getPosition$),
      tap((data: any) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        this.location.latitude = data.coords.latitude
        this.location.longitude = data.coords.longitude
      }),
      switchMap(() => this.updatePosition$)
    ).subscribe((res) => {
      console.log('first update', res);
    });

    // Subscribe to update very 5 minutes
    this.watchPosition$ = this.interval$.pipe(
      switchMap(() => this.getPosition$),
      tap((data: any) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        this.location.latitude = data.coords.latitude
        this.location.longitude = data.coords.longitude
      }),
      switchMap(() => this.updatePosition$)
    ).subscribe((res) => {
      console.log('updated', res);
    });

  }


  goToSearchBook() {
    this.navCtrl.navigateForward('search-book');

  }
  goToAddBook() {
    this.navCtrl.navigateForward('add-book');
  }

  openTutorial() {
    this.storage.get('tutorial_done').then((val) => {
      if(!val) {
        this.menuCtrl.enable(false);    
        this.storage.set('tutorial_done', false);
        this.router.navigateByUrl('/start-guide');
      }
    })    
  }

}
