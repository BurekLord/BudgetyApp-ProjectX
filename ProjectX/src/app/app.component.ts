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
        let users;
        const user = new User('jaje', 'jaje', 'jaje', 'jaje', 'jaje');

        // us.addUser(user);

        // db.addItem<User>(config.users_endpoint, user);

        db.getAllCollectionItems(config.users_endpoint).subscribe(res => {
            users = res;
            console.log('call from appComponent getAllUsers', users);
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
