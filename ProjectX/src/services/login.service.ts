import { User } from './../models/user.model';
import { config } from './config';
import { DBService } from './db.service';
import { Observable, from } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

import { auth } from 'firebase/app';
import { auth as authUi } from 'firebaseui';

import { UserCredentials } from './../models/userCredentials.model';

@Injectable()
export class LoginService implements OnInit {
    public userCredentials: UserCredentials;
    public userData: any;

    ui: any;
    uiConfig: any;

    constructor(private dbService: DBService) {
        // firebaseUI login

        // Initialize the FirebaseUI Widget using Firebase.
        this.ui = new authUi.AuthUI(auth());

        this.uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },

                uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // TODO`s
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                auth.GoogleAuthProvider.PROVIDER_ID,
                auth.EmailAuthProvider.PROVIDER_ID
                // auth.FacebookAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            privacyPolicyUrl: '<your-privacy-policy-url>'
        };

        // when user logs in
        auth().onAuthStateChanged(user => {
            if (user) {
                // checks if the user has just singed up in so that it doesn call addUser 2x
                let isFirstTime: boolean;
                isFirstTime =
                    user.metadata.creationTime ===
                        user.metadata.lastSignInTime &&
                    new Date().toString() ===
                        new Date(user.metadata.creationTime).toString();
                console.log(user);
                this.userCredentials = new UserCredentials(
                    user.displayName,
                    user.email,
                    user.emailVerified,
                    user.photoURL,
                    user.metadata.lastSignInTime,
                    user.uid,
                    user.metadata.creationTime === user.metadata.lastSignInTime
                );

                // probao sam ovu funkcionalnost da izdvojim iz ovog auth() metoda, al nema sanse, ne znam...
                if (isFirstTime) {
                    // if new user, create new user data
                    const newUser = new User(this.userCredentials.uid);
                    this.dbService.addItem<User>(
                        config.users_endpoint,
                        newUser,
                        newUser.getId()
                    );
                } else if (!isFirstTime) {
                    // ako nije nov uzmi njegove podatke i storuj ih u userData
                    this.dbService
                        .getItem<User>(
                            config.users_endpoint,
                            this.userCredentials.uid
                        )
                        .then(res => (this.userData = res));
                }
            } else {
                console.log('User IS singed OUT');
            }
        });
    }

    ngOnInit() {}

    startLogInUI() {
        // Finally, render the FirebaseUI Auth interface:
        // The start method will wait until the DOM is loaded.
        this.ui.start('#firebaseui-auth-container', this.uiConfig);
    }
}
