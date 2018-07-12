import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Articulo } from '../../models/item/item.model';

@Injectable()
export class InventoryService {

    articulosCollection: AngularFirestoreCollection<Articulo>;
    articuloDoc: AngularFirestoreDocument<Articulo>;
    articulos: Observable<Articulo[]>;
    articulo: Observable<Articulo>;

    constructor(private afs: AngularFirestore) {
        this.articulosCollection = this.afs.collection('Articulo');

    }

    getArticulos(): Observable<Articulo[]> {
        this.articulos = this.articulosCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Articulo;
                data.id = a.payload.doc.id;
                return data;
            });
        }));

        return this.articulos;
    }

    newArticulo(articulo: Articulo) {
        this.articulosCollection.add(articulo);
        console.log("Articulo Agregado");
    }


    addCant(cant: number, id: string) {
        this.articuloDoc = this.afs.doc(`Articulo/${id}`);
        cant++;
        console.log("Cant-Aft: " + cant);

        this.articuloDoc.update({
            "cantidad_actual": cant
        });
    }

    removeCant(cant: number, id: string) {
        this.articuloDoc = this.afs.doc(`Articulo/${id}`);
        cant--;
        console.log("Cant-Aft: " + cant);

        this.articuloDoc.update({
            "cantidad_actual": cant
        });
    }    

    /*
    getCheckArt(c: string): Observable<Articulo[]> {
        //Filter for specific data
        this.articulosCollection = this.afs.collection('Articulo', ref => ref.where('codigo', '==', c));

        //Return observable of users with specific data query
        this.articulos = this.articulosCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Articulo;
                data.id = a.payload.doc.id;
                return data;
            });
        }));

        return this.articulos;
    }*/

}