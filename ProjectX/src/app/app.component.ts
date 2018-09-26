import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { User } from '../models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(public us: UserService) {
        let users;
        // const user = new User(
        //     'zazazazazazaza',
        //     'zazazazazazaza',
        //     'zazazazazazaza',
        //     'zazazazazazaza',
        //     'zazazazazazaza'
        // );

        // us.addUser(user);

        us.getAllUsers().subscribe(res => {
            users = res;
            console.log('call from appComponent getAllUsers', users);
        });

        // setTimeout(() => {
        //     us.updateUser(users[0].id, user);
        // }, 1000);

        // remove user must be called after user list is defined
        // setTimeout(function() {
        //     us.removeUser(users[0].id);
        // }, 1000);

        // console.log('call from appComponent getUser', us.getUser(undefined));
    }

    ngOnInit() {}
}
