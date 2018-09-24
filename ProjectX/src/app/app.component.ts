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
        const user = new User(
            'yoyoyo',
            'yoyoyo',
            'yoyoyo',
            'yoyoyo',
            'yoyoyo',
            12,
            12,
            undefined,
            undefined,
            undefined,
            undefined
        );

        us.addUser(user);

        us.getAllUsers().subscribe(res => {
            users = res;
            console.log('call from appComponent getAllUsers', users);
        });
        // console.log('call from appComponent getUser', us.getUser(undefined));
    }

    ngOnInit() {}
}
