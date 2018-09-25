import { Income } from './../models/income.model';
import { Expense } from './../models/expense.model';
import { DBService } from './../services/db.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { User } from '../models/user.model';
import { config } from '../services/config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(public db: DBService) {
        // let items;
        // const user = new User(
        //     'kis kis',
        //     'kis kis',
        //     'kis kis',
        //     'kis kis',
        //     'toto',
        //     0,
        //     0,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined
        // );

        // db.addItem<User>(config.users_endpoint, user).then(res => console.log(res ? res.id : 'nodata');
        // setTimeout(() => {
        //     db.addItem<Income>(
        //         config.incomes_endpoint,
        //         new Income(
        //             'income 1',
        //             123415,
        //             'kategorija',
        //             new Date(),
        //             items[0].id
        //         )
        //     );
        // }, 1000);

        // setTimeout(() => {
        //     db.addItem<Expense>(
        //         config.incomes_endpoint,
        //         new Expense(
        //             'Expense 1',
        //             123415,
        //             'kategorija',
        //             new Date(),
        //             items[0].id
        //         )
        //     );
        // }, 1000);

        // db.getAllCollectionItems(config.users_endpoint).subscribe(res => {
        //     items = res;
        //     console.log('call from appComponent getAllCollectionItems', items);
        // });

        db.getItem(config.users_endpoint, 'B7BlHvwM1eQkJp2X3Fsb').then(
            console.log
        );

        // db.getAllCollectionItems(config.incomes_endpoint).subscribe(res => {
        //     items = res;
        //     console.log('call from appComponent getAllCollectionItems', items);
        // });

        // db.getAllCollectionItems(config.expenses_endpoint).subscribe(res => {
        //     items = res;
        //     console.log('call from appComponent getAllCollectionItems', items);
        // });

        // setTimeout(() => {
        //     db.updateItem(config.users_endpoint, '1kSrUrnjwoTxVeU8x0p7', user);
        // }, 1000);

        // setTimeout(function() {
        //     db.removeItem(config.users_endpoint, '534pVAhtFFomVMSh88FV');
        // }, 1000);
    }

    ngOnInit() {}
}
