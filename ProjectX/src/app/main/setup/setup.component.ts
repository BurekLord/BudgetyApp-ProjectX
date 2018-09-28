import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
    inputText = 'INPUT.SETUP_BALANCE';
    btnNextText = 'BUTTON.NEXT';
    btnAddText = 'BUTTON.ADD';
    btnBackText = 'BUTTON.BACK';
    tables = [
        { name: 'LABEL.BALANCE', value: ['12312454,123'] },
        { name: 'LABEL.COMMON_INCOMES', value: ['cat1', 'cat2'] }
    ];
    btnEndText = 'BUTTON.SKIP';

    constructor() {}

    ngOnInit() {}

    setIsNewFalse() {
        // TODO
    }
}
