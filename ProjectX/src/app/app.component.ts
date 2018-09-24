import { Income } from './../models/income.model';
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
    constructor(public us: UserService, public db: DBService) {
        let items;
        const user = new User('jaje', 'jaje', 'jaje', 'jaje', 'jaje');
        // us.addUser(user);

        // db.addItem<User>(config.users_endpoint, user);

        db.getAllCollectionItems(config.users_endpoint).subscribe(res => {
            items = res;
            console.log('call from appComponent getAllCollectionItems', items);
        });

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

        db.getAllCollectionItems(config.incomes_endpoint).subscribe(res => {
            items = res;
            console.log('call from appComponent getAllCollectionItems', items);
        });

        // setTimeout(() => {
        //     db.updateItem(config.users_endpoint, users[2].id, user);
        // }, 1000);

        // setTimeout(() => {
        //     us.updateUser(users[0].id, user);
        // }, 1000);

        // remove user must be called after user list is defined
        // setTimeout(function() {
        //     us.removeUser(users[0].id);
        // }, 1000);

        // remove user must be called after user list is defined
        // setTimeout(function() {
        //     db.removeItem(config.users_endpoint, users[2].id);
        // }, 1000);

        // console.log('call from appComponent getUser', us.getUser(undefined));
    }

    ngOnInit() {}
}
