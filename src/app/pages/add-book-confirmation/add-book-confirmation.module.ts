import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddBookConfirmationPage } from './add-book-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: AddBookConfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddBookConfirmationPage]
})
export class AddBookConfirmationPageModule {}
