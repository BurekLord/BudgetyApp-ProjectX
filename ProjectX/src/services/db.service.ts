import { Converter } from './../converters/converter';
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
export class DBService {
    collection: AngularFirestoreCollection<any>;
    document: AngularFirestoreDocument<any>;
    usersObservable: Observable<any>;

    constructor(public db: AngularFirestore) {}

    getAllCollectionItems(endpoint: string): Observable<any> {
        return this.db
            .collection(endpoint)
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        // Get document data
                        const data = a.payload.doc.data();
                        // Get document id
                        const id = a.payload.doc.id;
                        // Use spread operator to add the id to the document data
                        return { id, ...data };
                    });
                })
            );
    }

    updateItem<T>(endpoint: string, id: string, update: T) {
        this.document = this.db.doc<T>(`${endpoint}/${id}`);
        this.document.update({ ...Converter.modelToJson<T>(update) });
    }

    addItem<T>(endpoint: string, item: T) {
        this.collection = this.db.collection<T>(endpoint);
        // return this.usersCollection.add(JSON.parse(JSON.stringify(user)));
        // koristimo ... spred operator da raspodelimo polja u objekat. posto ovo sranje samo tako oce da radi. ne prima reference
        return this.collection.add({ ...Converter.modelToJson<T>(item) });
    }

    removeItem<T>(endpoint: string, id: string) {
        this.document = this.db.doc<T>(`${endpoint}/${id}`);
        this.document.delete();
    }

    getUser(id: string): User {
        return undefined;
    }
}
