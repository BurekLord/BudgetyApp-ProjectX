import { EventEmitter, Injectable } from '@angular/core';

import { Income } from '../../../models/income.model';
import { Expense } from './../../../models/expense.model';
import { DBService } from './../../../services/db.service';
import { PopupData } from './popup.data';

@Injectable()
export class PopupService {
    open: EventEmitter<{
        showPopup: boolean;
        refreshUser: boolean;
    }> = new EventEmitter();
    item: Income | Expense;
    delete = false;
    edit = false;

    private popupData: PopupData;

    constructor(private dBService: DBService) {}

    public getPopupData() {
        if (this.item) {
            this.popupData.options = true;
        }
        return this.popupData;
    }

    openPopup(title: string, message: string, item?: Income | Expense) {
        this.item = item;
        this.popupData = new PopupData(title, message);
        this.open.emit({ showPopup: true, refreshUser: false });
    }

    closePopup(truOrFols: boolean) {
        if (truOrFols) {
            if (this.item instanceof Income) {
                this.dBService.removeItem(
                    'incomes' + this.item.getUserId(),
                    this.item.getId()
                );
            } else {
                this.dBService.removeItem(
                    'expenses' + this.item.getUserId(),
                    this.item.getId()
                );
            }
            this.open.emit({ showPopup: false, refreshUser: true });
        }
        this.open.emit({ showPopup: false, refreshUser: false });
    }
}
