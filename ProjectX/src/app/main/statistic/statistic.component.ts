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

    // TODO: sad kad radi treba ovo napraviti da bude dinamicko... picko

    public static dataArr: any[] = [];

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

    constructor() {}

    ngOnInit() {
        StatisticComponent.dataArr = [];
        window.addEventListener('resize', () => {
            GoogleCharts.load(this.drawTimeMoneyChart);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.expenses[0]) {
            StatisticComponent.dataArr = [];
            this.expenses.forEach((expense) => {
                StatisticComponent.dataArr.push(new StatisticDataModel(expense.getTimeStamp(), expense.getValue()));
            });
            StatisticComponent.dataArr.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
            GoogleCharts.load(this.drawTimeMoneyChart);
            GoogleCharts.load('current', {packages: ['corechart']});
            // GoogleCharts.load(this.drawTimeMoneyChart);
        }
    }

    drawTimeMoneyChart() {

        console.log('DATA ARR U DRAW', this);
        console.log('pozvan draw');
        const transformedData = [['Time', 'Money']];
        StatisticComponent.dataArr.forEach((el) => {
            transformedData.push([el.time, el.value]);
        });
        const chart = GoogleCharts.api.visualization.arrayToDataTable(transformedData);
        const lineChart = new GoogleCharts.api.visualization.LineChart(
            document.getElementById('chart1')
        );

        // const elementWidth = document.getElementById('statistics').offsetWidth; // ovo resenje nije respoonsiv

        const options = {
            lineWidth: 2.5,
            pointSize: 5,
            legend: 'left', // gde stoji legenda
            title: 'Spending over time', // naslov
            titleTextStyle: {
                color: '#ffffff',
                fontSize: 20,
            },
            width: '100%', // kad se ucita uzme duzinu statistik diva i da mu tu duzinu. ne resajzuje se
            'backgroundColor': 'transparent',
            // 'opacity' : '0.8', // ovo ne radi
            // 'colors': '[red]', // ovo baguje zbog necega
            'fontSize': 15,
            // chartArea: { // ovo kontrolise koliki je i poziciju area gde se nalazi chart. ako stavi 100% sve onda se ne vide slova sa strane
            //     left: '5%',
            //     top: '15%',
            //     width: '90%',
            //     height: '75%'
            // },
            // curveType: 'function', // dal ce bude cik cak ili kurv
            hAxis: { // stilizuje slova u horizontali
                gridlines: { count: -1, color: '#606060' },
                minorGridlines: { count: -1, color: '#606060' },
                textStyle: {
                color: '#ffffff',
                fontSize: 12,
                // bold: true,
                // italic: true
          }},
          vAxis: { // stilizuje slova u vertikali
                // ticks: [-1000, -5000, -10000, -20000, -50000, -100000], // bolje da ostavim automacki
                direction: -1,
                slantedTextAngle: 60,
                format: 'currency',
                gridlines: { count: -1, color: '#606060'}, // ovo treba da bude valjda koliko linija ima, al ne radi...
                // baseline: 100,
                baselineColor: 'green',
                minorGridlines: {count: 100}, // nemam pojma sta radi ovo
                textStyle: {
                color: '#ffffff',
                fontSize: 12,
                // bold: true,
                // italic: true
          }},
            explorer: {
                // keepInBounds: true,
            }, // ovo je da moze da se zum i pan
            // theme: 'maximized',
            };
        lineChart.draw(chart, options);
    }
}

export class StatisticDataModel {
    constructor(public time: Date, public value: number) {}
}
