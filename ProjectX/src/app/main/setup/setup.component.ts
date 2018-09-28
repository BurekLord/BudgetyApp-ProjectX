import { User } from './../../../models/user.model';
import { DBService } from './../../../services/db.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserCredentials } from '../../../models/userCredentials.model';
import { config } from '../../../services/config';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
    @Input()
    userData: User;
    balanceStep = new HelperModel('INPUT.SETUP_BALANCE', 0, false);
    incomeStep = new HelperModel('INPUT.SETUP_INCOME', 1, false);
    expenseStep = new HelperModel('INPUT.SETUP_EXPENSE', 2, false);
    timeStep = new HelperModel('INPUT.SETUP_TIME_FRAME', 3, false);
    currentStep: HelperModel;
    steps: HelperModel[] = [
        this.balanceStep,
        this.incomeStep,
        this.expenseStep,
        this.timeStep
    ];
    end: boolean;

    inputText = '';
    btnNextText = 'BUTTON.NEXT';
    btnAddText = 'BUTTON.ADD';
    btnAddShow = false;
    btnBackText = 'BUTTON.BACK';
    btnEndText = 'BUTTON.SKIP';

    tables: HelperModel[] = [];

    constructor(private db: DBService) {}

    ngOnInit() {
        this.currentStep = this.steps[0];
        this.inputText = this.currentStep.name;
        this.tables = [
            new HelperModel('LABEL.BALANCE', 0),
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
            this.inputText = this.currentStep.name;
        } else {
            // in the last step, take all of the data and send it to be
            this.userData.setCategoriesExp(this.tables[2].value);
            this.userData.setCategoriesInc(this.tables[1].value);
            this.userData.setBalance(this.tables[0].value);
            this.userData.setSettings(undefined); //  TODO: see about this...
            this.db.updateItem<User>(
                config.users_endpoint,
                this.userData.getId(),
                this.userData
            );
            // TODO: remove this
            window.location.reload();
        }
    }
    previousStep() {
        if (this.currentStep.value !== 0) {
            this.currentStep = this.steps[this.currentStep.value - 1];
            this.inputText = this.currentStep.name;
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
        this.btnAddShow = false;

        if (input) {
            if (this.currentStep === this.steps[0]) {
                this.tables[0].isShown = true;
                this.tables[0].value.push(input);
                this.btnAddShow = true;
            } else if (this.currentStep === this.steps[1]) {
                this.tables[1].isShown = true;
                this.tables[1].value.push(input);
                this.btnAddShow = true;
            } else if (this.currentStep === this.steps[2]) {
                this.tables[2].isShown = true;
                this.tables[2].value.push(input);
            } else if (this.currentStep === this.steps[3]) {
                // TODO
                this.tables[3].isShown = true;
            }
            this.nextStep();
        } else {
            // TODO: remove and place a warning msg for the user
            alert('enter a goddamn VALUE!');
        }
    }

    onAdd(input: any) {
        if (this.currentStep === this.steps[1]) {
            this.tables[1].isShown = true;
            this.tables[1].value.push(input);
        } else if (this.currentStep === this.steps[2]) {
            this.tables[2].isShown = true;
            this.tables[2].value.push(input);
        }
    }

    onSkip() {
        // TODO: remove this
        window.location.reload();
    }
}

export class HelperModel {
    constructor(
        public name?: any,
        public value?: any,
        public isShown = false
    ) {}
}
