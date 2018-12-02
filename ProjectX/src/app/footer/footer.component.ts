import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { auth } from 'firebase/app';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    @Input() signOutShow: boolean;

    constructor(public translate: TranslateService) {}

    onSignOUt() {
        auth()
            .signOut()
            .then(function() {})
            .catch(function(error) {});
        window.location.reload();
    }

    ngOnInit() {}

    onEn() {
        this.translate.use('en');
    }
    onSr() {
        this.translate.use('sr');
    }
}
