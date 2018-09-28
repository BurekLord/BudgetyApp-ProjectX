import { User } from './../../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
    @Input()
    userData: User;

    constructor() {}

    ngOnInit() {}
}
