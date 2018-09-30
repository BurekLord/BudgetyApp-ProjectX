import { UserCredentials } from './../../models/userCredentials.model';
import { User } from './../../models/user.model';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
// in every component we use userData or userCredentials we will implement OnChanges angular life cycle hook
export class MainComponent implements OnInit, OnChanges {
    // to use user data or userCredentials we need a @Input on that component (app-component provides the data)
    @Input()
    userData: User;
    @Input()
    userCredentials: UserCredentials;

    currentUser: User;

    showSetup = false;
    showLogin = true;
    constructor() {}

    ngOnInit() {
        // in the console we can see that onInit userData is undefined. because it is called async
        console.log('onInit user data TEST', this.userData);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.userData && changes.userData.currentValue) {
            // OnChanges is subscribed on the @Input and every time input gets new data it is called
            console.log('On changes', changes.userData.currentValue);
            // now we have up to date current user with the latest data...
            // EVERY TIME user is changed in the database, this will be triggered
            this.currentUser = changes.userData.currentValue;
        }

        if (changes.userCredentials && changes.userCredentials.currentValue) {
            console.log('On credentials changes');
            if (changes.userCredentials.currentValue.isNew) {
                console.log('On credentials changes is new');
                this.showSetup = true;
                this.showLogin = false;
            } else {
                console.log('On credentials changes not new');
                this.showSetup = false;
                this.showLogin = false;
            }
        }
    }
}
