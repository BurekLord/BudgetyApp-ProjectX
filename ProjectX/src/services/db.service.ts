import { Converter } from './../converters/converter';
import { Injectable } from '@angular/core';
import {
    AngularFirestoreDocument,
    AngularFirestore,
    AngularFirestoreCollection
} from 'angularfire2/firestore';

import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable()
export class DBService {
    collection: AngularFirestoreCollection<any>;
    document: AngularFirestoreDocument<any>;
    usersObservable: Observable<any>;

    getOptions: firestore.GetOptions = {
        source: 'cache'
    };

    constructor(public db: AngularFirestore) {}

    getAllCollectionItemsWithIds(endpoint: string): Observable<any> {
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
        this.document
            .update({ ...Converter.modelToJson<T>(update) })
            .then(
                () =>
                    console.log(
                        `Document updated on ${endpoint} with id ${id}`
                    ),
                () =>
                    console.error(
                        `Document update REJECTED on ${endpoint} with id ${id}`
                    )
            );
    }

    addItem<T>(
        endpoint: string,
        item: T,
        id: string,
        userId?: string
    ): Promise<any> {
        this.collection = this.db.collection<T>(endpoint);
        // return this.usersCollection.add(JSON.parse(JSON.stringify(user)));
        // koristimo ... spred operator da raspodelimo polja u objekat. posto ovo sranje samo tako oce da radi. ne prima reference
        if (!userId) {
            return this.collection
                .doc(id)
                .set({ ...Converter.modelToJson<T>(item) });
        } else {
            console.log('intheconverter', Converter.modelToJson<T>(item));
            return this.db
                .collection(endpoint + userId)
                .add(Converter.modelToJson<T>(item));
        }
    }

    removeItem<T>(endpoint: string, id: string) {
        this.document = this.db.doc<T>(`${endpoint}/${id}`);
        this.document
            .delete()
            .then(
                resolved =>
                    console.log(
                        `Document from ${endpoint} with id ${id} was DELETED`
                    ),
                rejected =>
                    console.error(
                        `Document from ${endpoint} with id ${id} was NOT DELETED`,
                        rejected
                    )
            );
    }

    // OLD\ GET ITEM
    // getItem<T>(endpoint: string, id: string) {
    //     this.document = this.db.doc<T>(`${endpoint}/${id}`);
    //     return this.document.get().pipe(
    //         map(res => {
    //             return res.data()
    //                 ? Converter.jsonToModel(res.data(), endpoint)
    //                 : console.error('No data in response');
    //         })
    //     );
    // }

    getItem<T>(endpoint: string, id: string) {
        this.document = this.db.doc<T>(`${endpoint}/${id}`);
        return this.document
            .get()
            .toPromise()
            .then(res => {
                if (res.data()) {
                    return Converter.jsonToModel(res.data(), endpoint);
                } else {
                    this.document
                        .get(this.getOptions)
                        .toPromise()
                        .then(cache => {
                            return Converter.jsonToModel(
                                cache.data(),
                                endpoint
                            );
                        })
                        .catch(err => {
                            console.log('No data on server or in cache', err);
                        });
                }
            });
    }

    getSpecificItem<T>(endpoint: string, id: string) {
        return this.db.doc<T>(`${endpoint}/${id}`).snapshotChanges();
    }
}

// TODO: QUERIES

//    db.collection("cities").where("capital", "==", true)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
