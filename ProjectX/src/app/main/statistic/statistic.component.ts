import { Income } from './../../../models/income.model';
import { Expense } from './../../../models/expense.model';
import { User } from './../../../models/user.model';
import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { GoogleCharts } from 'google-charts';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, OnChanges {
    user: User;
    expenses: Expense[];
    incomes: Income[];
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

    typeOfChart: string;
    dataArr: any[] = [];

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.expenses[0]) {
            console.log(this.expenses[0].getTimeStamp());
            this.expenses.forEach((expense) => {
                this.dataArr.push(new StatisticDataModel(expense.getTimeStamp(), expense.getValue()));
            });
            console.log('DATA ARR', this.dataArr);
            GoogleCharts.load(this.drawChart);
        }
    }

    drawChart() {
        const data = GoogleCharts.api.visualization.arrayToDataTable([
            ['Time', 'Money'],
            ['day 1', 60],
            ['day 2', 22],
            ['day 3', 18],
            ['day 4', 18],
            ['day 5', 18],
            ['day 6', 18],
            ['day 7', 18]
        ]);
        const lineChart = new GoogleCharts.api.visualization.LineChart(
            document.getElementById('chart1')
        );
        lineChart.draw(data);
    }
}

export class StatisticDataModel {
    constructor(public time: any, public money: number) {}
}
