import { config } from './../../../services/config';
import { DBService } from './../../../services/db.service';
import { User } from '../../../models/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { Income } from '../../../models/income.model';
import { Expense } from '../../../models/expense.model';

@Component({
    selector: 'app-main-input',
    templateUrl: './main-input.component.html',
    styleUrls: ['./main-input.component.scss']
})
export class MainInputComponent implements OnInit {
    @Input()
    userData: User;
    expDropIsHidden = true;
    incDropIsHidden = true;
    constructor(public db: DBService) {}

    ngOnInit() {}

    onIncomeAddClick(inc: any, name: any, value: any) {
        this.incDropIsHidden = true;
        const newIncome = new Income(
            name,
            value,
            inc,
            new Date(),
            this.userData.getId()
        );
        this.db
            .addItem<Income>(
                config.incomes_endpoint,
                newIncome,
                undefined,
                this.userData.getId()
            )
            .then(console.log);
    }

    onExpenseAddClick(exp: any, name: any, value: any) {
        this.expDropIsHidden = true;
        const newExpense = new Expense(
            name,
            value,
            exp,
            new Date(),
            this.userData.getId()
        );
        this.db.addItem<Expense>(
            config.incomes_endpoint,
            newExpense,
            undefined,
            this.userData.getId()
        );
    }

    onIncBtn() {
        this.incDropIsHidden = !this.incDropIsHidden;
    }

    onExpBtn() {
        this.expDropIsHidden = !this.expDropIsHidden;
    }
}
