import { Injectable } from '@angular/core';
import {
    AngularFirestoreDocument,
    AngularFirestore,
    AngularFirestoreCollection
} from 'angularfire2/firestore';
import { config } from './config';

import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models/user.model';
@Injectable()
export class UserService {
    usersCollection: AngularFirestoreCollection<User> = this.db.collection<
        User
    >(config.users_endpoint);
    userDocument: AngularFirestoreDocument<User>;
    usersObservable: Observable<any>;

    constructor(public db: AngularFirestore) {}

    getAllUsers() {
        return this.db
            .collection(config.users_endpoint)
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        // Get document data
                        const data = a.payload.doc.data() as User;
                        // Get document id
                        const id = a.payload.doc.id;
                        // Use spread operator to add the id to the document data
                        return { id, ...data };
                    });
                })
            );
    }

    updateUser(id: string, update: User) {
        this.userDocument = this.db.doc<User>(`${config.users_endpoint}/${id}`);
        this.userDocument
            .update(update)
            .then(console.log)
            .catch(console.error);
    }

    addUser(user: User) {
        return this.usersCollection.add(JSON.parse(JSON.stringify(user)));
    }

    removeUser(id: string) {
        this.userDocument = this.db.doc<User>(`${config.users_endpoint}/${id}`);
        this.userDocument
            .delete()
            .then(console.log)
            .catch(console.error);
    }

    getUser(user: User): User {
        return undefined;
    }
}
