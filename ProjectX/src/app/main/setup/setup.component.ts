import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
    inputText = 'First lets enter yout current balance';
    btnNextText = 'Next';
    btnAddText = 'Add';
    tables = [
        { name: 'balance', value: ['12312454,123'] },
        { name: 'common incomes', value: ['cat1', 'cat2'] }
    ];
    btnEndText = 'Skip';

    constructor() {}

    ngOnInit() {}
}
