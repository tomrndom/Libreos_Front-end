import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserTransactionService } from 'src/app/services/api/user-transaction.service';
import { AppUserService } from 'src/app/services/api/app-user.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  user: any;
  requestTransactions: any;
  pendingTransactions: any;

  constructor(
    private navCtrl: NavController,
    private _userTransactionService: UserTransactionService,
    private _AppUserService: AppUserService
  ) { }

  ngOnInit() {
    this._AppUserService.user.then((user) => {
      this.user = JSON.parse(user)
      let filterRequestTransactions = {
        "where": {
          "and": [
            {
              "fromUserId": `${this.user.id}`
            },
            {
              "deletedAt": null
            }
          ]
        },
        "include": [
          {
            "relation": "transaction", "scope": {
              "include": [
                { "relation": "book", "scope": { "include": ["gender", { 'bookConditions': 'condition' }] } },
                { "relation": "transactionStates" }
              ]
            }
          }
        ]
      };

      let filterPendingTransactions = {
        "where": {
          "and": [
            {
              "toUserId": `${this.user.id}`
            },
            {
              "deletedAt": null
            }
          ]
        },
        "include": [
          {
            "relation": "transaction", "scope": {
              "include": [
                { "relation": "book", "scope": { "include": ["gender", { 'bookConditions': 'condition' }] } },
                { "relation": "transactionStates" }
              ]
            }
          }
        ]
      };

      this._userTransactionService.getAll(filterRequestTransactions).subscribe(
        res => {
          this.requestTransactions = res
          console.log(this.requestTransactions)
        }
      )

      this._userTransactionService.getAll(filterPendingTransactions).subscribe(
        res => {
          this.pendingTransactions = res
          console.log(this.pendingTransactions)
        }
      )


    });

  }
  goBack() {
    this.navCtrl.back();
  }

}
