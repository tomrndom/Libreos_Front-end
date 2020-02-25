import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppUserService } from 'src/app/services/api/app-user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  location: any = {
    latitude:null,
    longitude:null
  }
  constructor(
    private navCtrl: NavController,
    public geolocation: Geolocation,
    private _AppUserService: AppUserService,
  ) {
    //this.getUserLocation()
  }


  getUserLocation() {
    // this.geolocation.getCurrentPosition().then((res) => {
    //   console.log(res, 'response')
    //   this.latitud = res.coords.latitude
    //   this.longitude = res.coords.longitude
    // }).catch((error) => {
    // });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.location.latitude = data.coords.latitude
      this.location.longitude = data.coords.longitude
      console.log(data, 'data')
      console.log(this.location)
      this._AppUserService.putLocation(this.location).subscribe( res => {
        console.log(res)
      });
    });
  }

  goToSearchBook() {
    this.navCtrl.navigateForward('search-book');

  }
  goToAddBook() {
    this.navCtrl.navigateForward('add-book');
  }

}
