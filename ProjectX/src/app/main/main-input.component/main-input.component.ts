import { config } from './../../../services/config';
import { DBService } from './../../../services/db.service';
import { User } from '../../../models/user.model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
    expCategoryEmpty: boolean;
    incCategoryEmpty: boolean;
    expDropIsHidden = true;
    incDropIsHidden = true;
    @ViewChild('expCategory')
    expCategory: ElementRef;
    @ViewChild('incCategory')
    incCategory: ElementRef;
    @ViewChild('name')
    name: ElementRef;
    @ViewChild('value')
    value: ElementRef;

    constructor(public db: DBService) {}
    clearInputFields() {
        this.name.nativeElement.value = null;
        this.value.nativeElement.value = null;
    }
    ngOnInit() {}

    onIncomeAddClick(inc: any, name: any, value: any) {
        if (value) {
            this.incDropIsHidden = true;

            // kreireaj nov income i pretvori vrednos u pozitivnu vrednost
            const newIncome = new Income(
                name,
                parseFloat(value.toString()),
                inc,
                new Date(),
                this.userData.getId()
            );
            this.db.addItem<Income>(
                config.incomes_endpoint,
                newIncome,
                undefined,
                this.userData.getId()
            );

            if (this.incCategoryEmpty === true) {
                console.log(name);
                this.userData.setCategoriesInc([inc]);
            }

            // updejtuj userData
            this.db.updateItem<User>(
                config.users_endpoint,
                this.userData.getId(),
                this.userData
            );

            // calc balance
            this.calculateBalance();

            this.clearInputFields();
        } else {
            alert('enter a value');
        }
    }

    onExpenseAddClick(exp: any, name: any, value: any) {
        // ako postoji value u inputu
        if (value) {
            this.expDropIsHidden = true;

            // kreiraj novi expens i stavi minus ispred vrednosti i pretvori je u number
            const newExpense = new Expense(
                name,
                parseFloat('-' + value.toString()),
                exp,
                new Date(),
                this.userData.getId()
            );
            // odaj ga u bazu
            this.db.addItem<Expense>(
                config.expenses_endpoint,
                newExpense,
                undefined,
                this.userData.getId()
            );

            // ako ne postoje kategorije setuj dodatu kategoriju u userData
            if (this.expCategoryEmpty === true) {
                console.log(name);
                this.userData.setCategoriesExp([exp]);
            }

            // updejtuj userData
            this.db.updateItem<User>(
                config.users_endpoint,
                this.userData.getId(),
                this.userData
            );
            // calc balance
            this.calculateBalance();

            this.clearInputFields();
        } else {
            alert('enter a value');
        }
    }

    onIncBtn() {
        this.incDropIsHidden = !this.incDropIsHidden;
        this.expDropIsHidden = true;
        this.incCategoryEmpty =
            this.userData.getCategoriesInc() === undefined ||
            this.userData.getCategoriesInc().length === 0;
    }

    onExpBtn() {
        this.expDropIsHidden = !this.expDropIsHidden;
        this.incDropIsHidden = true;
        this.expCategoryEmpty =
            this.userData.getCategoriesExp() === undefined ||
            this.userData.getCategoriesExp().length === 0;
        console.log(this.expCategoryEmpty);
    }

    calculateBalance() {
        this.db.joinIncomeAndExpens(this.userData.getId()).subscribe(res => {
            // add them into one arr
            const data = [];
            res[0].forEach((incEl) => {
                data.push(incEl.data()['value']);
            });
            res[1].forEach((expEl) => {
                data.push(expEl.data()['value']);
            });
            // add them
            let total = 0;
            data.forEach((el) => {
                total += el;
            });
            // update user balance
            this.db.getDocRef(config.users_endpoint, this.userData.getId()).update({
                'balance': total
            });
        });
    }
}
