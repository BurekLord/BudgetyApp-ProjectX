import { config } from './../../../services/config';
import { User } from './../../../models/user.model';
import { Income } from './../../../models/income.model';
import { Expense } from './../../../models/expense.model';
import { DBService } from './../../../services/db.service';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef
} from '@angular/core';
import { expand } from 'rxjs/operators';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnChanges {
    //
    @ViewChild('expInput')
    expInput: ElementRef;
    @ViewChild('incInput')
    incInput: ElementRef;

    user: User;
    expenses: Expense[];
    incomes: Income[];
    currency: String;

    @Input()
    set userData(value) {
        this.user = value;
    }
    @Input()
    set userExpenses(value) {
        this.expenses = value;
    }
    @Input()
    set userIncomes(value) {
        this.incomes = value;
    }
    // values to display from this array for expsense categories
    expCategoryValuePairs = [];
    // values to display from this array for income categories
    incCategoryValuePairs = [];

    expInputShow = false;
    expBtnFinish = false;

    incInputShow = false;
    incBtnFinish = false;

    constructor(private db: DBService) {}

    clearInputFields() {
        this.expInput.nativeElement.value = null;
        this.incInput.nativeElement.value = null;
    }

    // format money values to dot separated string e.g. 4.000
    formatMoney(money: number): string {
        // currency will be worked on, string literal for now
        this.currency = '$';
        // array of digits form given number
        let digits: string[];
        digits = money.toString().split('');
        // final array of formated number with dots to be converted to string
        const formatedDigits: string[] = [];
        let formatedMoney = '';
        let dotPoint = digits.length - 1;
        for (let i = digits.length - 1; i > -1; i--) {
            if (i === dotPoint - 3) {
                formatedDigits.unshift(digits[i] + '.');
                dotPoint -= 3;
            } else {
                formatedDigits.unshift(digits[i]);
            }
        }
        // create final string joining elements of formatedDigits array
        formatedMoney = formatedDigits.join('') + this.currency;
        return formatedMoney;
    }

    // get total money spent by Category
    totalExpByCat() {
        this.expCategoryValuePairs = [];
        // temporary array with all categories
        const tmpCatArr: string[] = this.user.getCategoriesExp();
        // loop through all categories
        tmpCatArr.forEach(cat => {
            let catVal = 0;
            // loop through all expenses
            this.expenses.forEach(exp => {
                // compare category values from tmpCatArr and expense array
                if (cat === exp.getCategory()) {
                    // if true add all expense values(converted to positives) for current category
                    catVal += Math.abs(exp.getValue());
                }
            });
            this.expCategoryValuePairs.push([cat, this.formatMoney(catVal)]);
        });
    }

    // get total money gained by Category
    totalIncByCat() {
        this.incCategoryValuePairs = [];
        // temporary array with all categories
        const tmpCatArr: string[] = this.user.getCategoriesInc();
        // loop through all categories
        tmpCatArr.forEach(cat => {
            let catVal = 0;
            // loop through all expenses
            this.incomes.forEach(inc => {
                // compare category values from tmpCatArr and expense array
                if (cat === inc.getCategory()) {
                    // if true add all expense values(converted to positives) for current category
                    catVal += inc.getValue();
                }
            });
            this.incCategoryValuePairs.push([cat, this.formatMoney(catVal)]);
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        // if (this.userData) {
        //     if (!this.userData.getCategoriesExp()) {
        //         this.userData.setCategoriesExp([]);
        //     }
        // }
        this.totalExpByCat();
        this.totalIncByCat();
    }

    ngOnInit() {}

    onAdd(value: string, type: string) {
        if (type === 'expense') {
            this.expInputShow = true;
            this.expBtnFinish = true;
        } else if (type === 'income') {
            this.incInputShow = true;
            this.incBtnFinish = true;
        }
        console.log(this.user);
        if (value) {
            if (this.user) {
                if (type === 'expense') {
                    this.user
                        .getCategoriesExp()
                        .push(
                            value[0].toUpperCase() +
                                value.slice(1).toLowerCase()
                        );
                } else if (type === 'income') {
                    this.user
                        .getCategoriesInc()
                        .push(
                            value[0].toUpperCase() +
                                value.slice(1).toLowerCase()
                        );
                }
                this.db.updateItem<User>(
                    config.users_endpoint,
                    this.user.getId(),
                    this.user
                );
            }
        }
        this.clearInputFields();
    }

    onFinish(type: string) {
        if (type === 'expense') {
            this.expInputShow = false;
            this.expBtnFinish = false;
        }
        if (type === 'income') {
            this.incInputShow = false;
            this.incBtnFinish = false;
        }

        this.db.updateItem<User>(
            config.users_endpoint,
            this.user.getId(),
            this.user
        );
        this.clearInputFields();
    }

    onRemove(cat: any, type: string) {
        // ovo moze mnoooooogo bolje, al sam lenj
        if (type === 'expense') {
            this.user
                .getCategoriesExp()
                .splice(this.user.getCategoriesExp().indexOf(cat), 1);
        } else if (type === 'income') {
            this.user
                .getCategoriesInc()
                .splice(this.user.getCategoriesInc().indexOf(cat), 1);
        }
        this.db.updateItem<User>(
            config.users_endpoint,
            this.user.getId(),
            this.user
        );
    }
}
