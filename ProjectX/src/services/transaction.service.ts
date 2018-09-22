import { Expense } from './../models/expense.model';
import { User } from './../models/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Income } from '../models/income.model';

@Injectable()
export class TransactionService {
    constructor(private db: AngularFireDatabase) {}

    getAllUserIncomes(user: User): Income[] {
        return undefined;
    }

    getAllUserExpences(user: User): Expense[] {
        return undefined;
    }
}
