import { Converter } from './../converters/converter';
import { config } from './../services/config';
import { User } from './../models/user.model';
import { UserCredentials } from './../models/userCredentials.model';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';

import { DBService } from './../services/db.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    currUserData: any;
    currUserCredentials: UserCredentials;
    constructor(
        public db: DBService,
        translate: TranslateService,
        private loginService: LoginService
    ) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit() {
        this.loginService.userCredentials.subscribe(res => {
            if (res) {
                console.log('changed user credenttials, ', res);
                this.currUserCredentials = res;
                this.db
                    .getSpecificItem(
                        config.users_endpoint,
                        this.currUserCredentials.uid
                    )
                    .subscribe(userData => {
                        if (userData) {
                            this.currUserData = Converter.jsonToModel(
                                userData.payload.data(),
                                config.users_endpoint
                            );
                        }
                        // setTimeout(() => {
                        //     this.db.updateItem<User>(
                        //         config.users_endpoint,
                        //         this.currUserCredentials.uid,
                        //         new User(this.currUserCredentials.uid, 'KOJA KOJA')
                        //     );
                        // }, 5000);
                    });
            }
        });
    }
}
