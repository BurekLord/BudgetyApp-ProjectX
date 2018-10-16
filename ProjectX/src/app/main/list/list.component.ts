import { element } from 'protractor';
import { PopupData } from './../popup/popup.data';
import { Income } from './../../../models/income.model';
import { Expense } from './../../../models/expense.model';
import { User } from './../../../models/user.model';
import {
    Component,
    OnInit,
    Input,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    user: User;
    expenses: Expense[];
    incomes: Income[];

    list: (Expense | Income)[];
    categoriesList = [];
    filterOptions = new FilterOptions();

    @ViewChild('type')
    type: ElementRef;
    @ViewChild('date')
    date: ElementRef;
    @ViewChild('category')
    category: ElementRef;
    @ViewChild('endDate')
    endDate: ElementRef;
    @ViewChild('startDate')
    startDate: ElementRef;

    @Input()
    showPopup = false;
    popupData: PopupData;
    showType = false;
    showDate = false;
    showCategory = false;
    showDropdown = false;
    clicked: string;

    @Output()
    emitOnClose: EventEmitter<any> = new EventEmitter();

    close() {
        this.reset();
        this.emitOnClose.emit(false);
    }

    PopupEventTriggered(data) {
        this.showPopup = data;
    }

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

    constructor() {}

    dropdownOption(option) {
        if (this.clicked === option) {
            this.showDropdown = false;
            this.clicked = '';
        } else {
            this.clicked = option;
            this.showDropdown = true;
        }

        option === 'Type' && this.showType === false
            ? (this.showType = true)
            : (this.showType = false);
        option === 'Date' && this.showDate === false
            ? (this.showDate = true)
            : (this.showDate = false);
        option === 'Category' && this.showCategory === false
            ? (this.showCategory = true)
            : (this.showCategory = false);
    }

    existingDateCheck(option, value, input: any) {
        let found: boolean;
        if (this.filterOptions.type === 'Expense') {
            const expVals: number[] = [];
            this.expenses.forEach(exp => {
                expVals.push(
                    this.timeStampConvert(new Date(exp.getTimeStamp()))
                );
            });
            if (
                this.timeStampConvert(new Date(value)) >=
                    Math.min(...expVals) &&
                this.timeStampConvert(new Date(value)) <= Math.max(...expVals)
            ) {
                found = true;
            }
        } else if (this.filterOptions.type === 'Income') {
            const incVals: number[] = [];
            this.incomes.forEach(inc => {
                incVals.push(
                    this.timeStampConvert(new Date(inc.getTimeStamp()))
                );
            });
            if (
                this.timeStampConvert(new Date(value)) >=
                    Math.min(...incVals) &&
                this.timeStampConvert(new Date(value)) <= Math.max(...incVals)
            ) {
                found = true;
            }
        }
        if (found) {
            return this.timeStampConvert(new Date(value));
        } else if (!found) {
            this.popupData = new PopupData(
                'Date not found',
                'Please specify existing ' +
                    option +
                    ' date for ' +
                    this.filterOptions.type +
                    '!'
            );
            this.showPopup = true;
            input.value = null;
        }
    }

    timeStampConvert(timeStamp: any): number {
        // time stamp to date string to miliseconds
        const date = Date.parse(timeStamp.toDateString());
        return date;
    }

    setFilterOptions(option: string, value: any, input?: any) {
        // get type
        if (option === 'Type') {
            this.filterOptions.type = value;
            this.filterOptions.endDate = undefined;
            this.filterOptions.startDate = undefined;

            this.filterOptions.category = null;
            if (value === 'Expense') {
                this.categoriesList = this.user.getCategoriesExp();
            } else if (value === 'Income') {
                this.categoriesList = this.user.getCategoriesInc();
            }
            // get date
        } else if (option === 'start') {
            this.filterOptions.startDate = this.existingDateCheck(
                option,
                value,
                input
            );
            this.endDate.nativeElement.value = null;
        } else if (option === 'end') {
            this.filterOptions.endDate = this.existingDateCheck(
                option,
                value,
                input
            );
            this.filterOptions.category = undefined;
            // get category
        } else if (option === 'Category') {
            this.filterOptions.endDate = undefined;
            this.filterOptions.startDate = undefined;
            this.startDate.nativeElement.value = null;
            this.endDate.nativeElement.value = null;
            this.filterOptions.category = value;
        }
        console.log(this.filterOptions);
    }

    setList() {
        const cat = this.filterOptions.category;
        const start = this.filterOptions.startDate;
        const end = this.filterOptions.endDate;
        let tmpList: (Expense | Income)[];
        // select and sort expenses
        if (this.filterOptions.type === 'Expense') {
            if (this.filterOptions.category) {
                tmpList = this.expenses.filter(function(exp) {
                    return exp.getCategory() === cat;
                });
            } else if (
                this.filterOptions.startDate &&
                this.filterOptions.endDate
            ) {
                // filter through expenses and return those with timestamp between start and end(date)
                tmpList = this.expenses.filter(function(exp) {
                    return (
                        Date.parse(exp.getTimeStamp().toDateString()) >=
                            start &&
                        Date.parse(exp.getTimeStamp().toDateString()) <= end
                    );
                });
            } else {
                tmpList = this.expenses;
            }
        } else if (this.filterOptions.type === 'Income') {
            // select and sort incomes
            if (cat) {
                tmpList = this.incomes.filter(function(inc) {
                    return inc.getCategory() === cat;
                });
            } else if (start && end) {
                // filter through incomes and return those with timestamp between start and end(date)
                tmpList = this.incomes.filter(function(inc) {
                    return (
                        Date.parse(inc.getTimeStamp().toDateString()) >=
                            start &&
                        Date.parse(inc.getTimeStamp().toDateString()) <= end
                    );
                });
            } else {
                tmpList = this.incomes;
            }
        }
        this.list = tmpList;
    }

    reset() {
        this.list = [];
        this.categoriesList = [];
        this.filterOptions = new FilterOptions();

        this.type = undefined;
        this.date = undefined;
        this.category = undefined;
        this.endDate = undefined;
        this.startDate = undefined;
        this.showPopup = false;
        this.showType = false;
        this.showDate = false;
        this.showCategory = false;
        this.showDropdown = false;
        this.clicked = undefined;
    }

    test() {
        this.timeStampConvert(this.filterOptions[0].period);
    }

    ngOnInit() {}
}

export class FilterOptions {
    constructor(
        public type?: string,
        public startDate?: number,
        public endDate?: number,
        public category?: string
    ) {}
}
