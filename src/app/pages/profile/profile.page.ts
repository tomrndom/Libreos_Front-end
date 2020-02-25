import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/api/app-user.service';
import { AppUser } from 'src/app/services/sdk';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:any = {
    id:0,
    email:'',
    firstname:'',
    lastname:'',
    phone:'',
    username:''
  }
  constructor(
              private dataService: DataService,
              private _AppUserService:AppUserService,
              private navCtrl:NavController
  ) {
    this._AppUserService.user.then((user)=>{
      console.log(JSON.parse(user))
      this.user = JSON.parse(user)
    });
  }

  ngOnInit() {
  
    
  }

  goToEdit(){
    this.navCtrl.navigateForward('profile-edit')
  }

  goBack() {
    this.navCtrl.back()
  }
}
