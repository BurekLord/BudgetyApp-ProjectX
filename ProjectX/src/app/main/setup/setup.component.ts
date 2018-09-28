import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
    balanceStep = new HelperModel('balanceStep', 0, false);
    incomeStep = new HelperModel('incomeStep', 1, false);
    expenseStep = new HelperModel('expenseStep', 2, false);
    timeStep = new HelperModel('timeStep', 3, false);
    currentStep: HelperModel;
    steps: HelperModel[] = [
        this.balanceStep,
        this.incomeStep,
        this.expenseStep,
        this.timeStep
    ];

    inputText = 'INPUT.SETUP_BALANCE';
    btnNextText = 'BUTTON.NEXT';
    btnAddText = 'BUTTON.ADD';
    btnBackText = 'BUTTON.BACK';
    btnEndText = 'BUTTON.SKIP';

    tables: HelperModel[] = [];

    constructor() {}

    ngOnInit() {
        this.currentStep = this.steps[0];
        this.tables = [
            new HelperModel('LABEL.BALANCE', []),
            new HelperModel('LABEL.COMMON_INCOMES', []),
            new HelperModel('LABEL.COMMON_EXPENSES', []),
            new HelperModel('LABEL.DEFAULT_TIME_FRAME', [
                'TIME_DATE.DAY',
                'TIME_DATE.WEEK',
                'TIME_DATE.MONTH',
                'TIME_DATE.YEAR'
            ])
        ];
    }

    nextStep() {
        if (this.currentStep.value !== 3) {
            this.currentStep = this.steps[this.currentStep.value + 1];
        }
    }
    previousStep() {
        if (this.currentStep.value !== 0) {
            this.currentStep = this.steps[this.currentStep.value - 1];
        }
    }

    onBack() {
        // if first step just reload app for now. later maybe make this go to some other route
        if (this.currentStep === this.steps[0]) {
            window.location.reload();
        }
        this.previousStep();
    }

    onNext(input: any) {
        if (input) {
            if (this.currentStep === this.steps[0]) {
                this.tables[0].isShown = true;
                this.tables[0].value.push(input);
            }
            this.nextStep();
        }
    }

    onAdd() {
        // TODO
    }

    onSkip() {
        // TODO
    }
}

export class HelperModel {
    constructor(
        public name?: any,
        public value?: any,
        public isShown = false
    ) {}
}
