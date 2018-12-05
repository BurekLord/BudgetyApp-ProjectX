import { Component, OnInit } from '@angular/core';

import { PopupData } from './popup.data';
import { PopupService } from './popup.service';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
    popupData: PopupData;

    constructor(private popupService: PopupService) {}

    close(truOrFols: boolean) {
        this.popupService.closePopup(truOrFols);
    }

    ngOnInit() {
        this.popupData = this.popupService.getPopupData();
    }
}
