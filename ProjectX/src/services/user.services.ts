import { User } from './../models/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor(private db: AngularFireDatabase) {}

    getAllUsers(): User[] {
        return undefined;
    }

    getUserById(userId: string): User {
        return undefined;
    }

    addUser(user: User) {
        return undefined;
    }

    removeUser(user: User) {
        return undefined;
    }

    updateUser(user: User) {
        return undefined;
    }
}
