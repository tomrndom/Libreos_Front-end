import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LibraryPage } from './library.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: LibraryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [LibraryPage]
})
export class LibraryPageModule {}
