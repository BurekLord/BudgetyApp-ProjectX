import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { auth as authUi } from 'firebaseui';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    displayName;
    email;
    emailVerified;
    photoURL;
    isAnonymous;
    uid;
    providerData;

    constructor() {
        // firebaseUI login

        // Initialize the FirebaseUI Widget using Firebase.
        const ui = new authUi.AuthUI(auth());

        const uiConfig = {
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

        // Finally, render the FirebaseUI Auth interface:
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);

        // when user loges in observable
        auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('User singed IN', user);
                this.displayName = user.displayName;
                this.email = user.email;
                this.emailVerified = user.emailVerified;
                this.photoURL = user.photoURL;
                this.isAnonymous = user.isAnonymous;
                this.uid = user.uid;
                this.providerData = user.providerData;
                // ...
            } else {
                console.log('User IS singed OUT');
            }
        });
    }
    ngOnInit() {}
}
