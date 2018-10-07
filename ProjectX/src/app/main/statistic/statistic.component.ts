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
    dataArr: any[];

    constructor() {}

    ngOnInit() {
        this.dataArr = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.expenses[0]) {
            console.log(this.expenses);
            this.dataArr = [];
            this.expenses.forEach((expense) => {
                this.dataArr.push(new StatisticDataModel(expense.getTimeStamp(), expense.getValue()));
            });
            this.dataArr.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
            console.log(this.dataArr);
            GoogleCharts.load(this.drawTimeMoneyChart);
            // GoogleCharts.load(this.drawTimeMoneyChart);
        }
    }

    drawTimeMoneyChart() {
        const transformedData = [['Time', 'Money']];
        console.log(this.dataArr);
        this.dataArr.forEach((el) => {
            transformedData.push([el.time, el.value]);
        });
        const chart = GoogleCharts.api.visualization.arrayToDataTable(transformedData);
        const lineChart = new GoogleCharts.api.visualization.LineChart(
            document.getElementById('chart1')
        );
        lineChart.draw(chart);
    }
}

export class StatisticDataModel {
    constructor(public time: Date, public value: number) {}
}
