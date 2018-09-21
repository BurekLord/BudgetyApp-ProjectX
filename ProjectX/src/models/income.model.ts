// import { formatDate } from '@angular/common';

export class Income {
    /*fields*/
    private incomeName: string;
    private value: number;
    private category: string;
    private timeStamp: string;

    /*setters*/
    public set incomeNameSet(exp: string) {
        this.incomeName = exp;
    }
    public set valueSet(val: number) {
        this.value = val;
    }
    public set categorySet(cat: string) {
        this.category = cat;
    }
    /*das mu obekat new Date() i formatira vreme i datum
    custom kao u datom stringu.
    Ne znam zasto nema ovog modula 'formatDate. Pogleaj*/

    // public set timestampSet(newDate: Date) {
    //     this.timeStamp = formatDate(newDate, 'dd.MM.yyyy hh:mm:ss', 'en');
    // }

    /*getters*/
    public get expenseNameGet() {
        return this.incomeName;
    }
    public get valueGet() {
        return this.value;
    }
    public get categoryGet() {
        return this.category;
    }
    public get timeStampGet() {
        return this.timeStamp;
    }
}
