import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ItemBookComponent } from '../components/item-book/item-book.component';
import { ItemTransactionComponent } from '../components/item-transaction/item-transaction.component'
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule
  ],
  declarations: [ItemBookComponent, ItemTransactionComponent],
  exports: [ItemBookComponent, ItemTransactionComponent]
})
export class SharedComponentsModule { }
