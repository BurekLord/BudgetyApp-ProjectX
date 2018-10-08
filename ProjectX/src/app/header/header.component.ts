import { User } from './../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { auth } from 'firebase/app';
import { UserCredentials } from '../../models/userCredentials.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input()
    userData: User;
    @Input()
    userCredentials: UserCredentials;

    constructor() {}

    onSignOUt() {
        auth()
            .signOut()
            .then(function() {
                console.log('User sign-OUT method called!');
            })
            .catch(function(error) {
                console.log('Error happened while singing OUT!', error);
            });
        window.location.reload();
    }

    ngOnInit() {}
}
