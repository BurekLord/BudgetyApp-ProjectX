import { PopupData } from './popup.data';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
    @Input()
    popupData: PopupData = new PopupData();
    @Output()
    closePopupEvent: EventEmitter<any> = new EventEmitter();
    constructor() {}
    close() {
        this.closePopupEvent.emit(false);
    }

    ngOnInit() {}
}
