import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
    }

    ngOnInit() {}
}
