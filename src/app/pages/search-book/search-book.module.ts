import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchBookPage } from './search-book.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
const routes: Routes = [
  {
    path: '',
    component: SearchBookPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule

  ],
  declarations: [SearchBookPage]
})
export class SearchBookPageModule {}
