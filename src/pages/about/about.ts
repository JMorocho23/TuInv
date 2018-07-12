import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InventoryService } from '../../app/services/inventory/inventory.service';
import { Articulo } from '../../app/models/item/item.model';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  articulos: Articulo[];
  id:string;
  code: number;
  art: Articulo = {
    codigo: '',
    nombre: '',
    cantidad_actual: 0,
    descripcion: '',
    precio: 0

  }



  constructor(private invService:InventoryService, public navCtrl: NavController) {
    this.invService.getArticulos().subscribe(articulos =>  this.articulos = articulos);
  }

  addCant(b:string){
    
    this.articulos.map(values =>{
      if(b.match(values.codigo)){
        this.id = values.id
        console.log("Cod: " + values.codigo);
        this.art.cantidad_actual = values.cantidad_actual
      }
    });

    console.log("Cant: " + this.art.cantidad_actual);
    console.log("id: " + this.id);

    this.invService.addCant(this.art.cantidad_actual , this.id);
  }

  removeCant(b:string){

    this.articulos.map(values =>{
      if(b.match(values.codigo)){
        this.id = values.id
        console.log("Cod: " + values.codigo);
        this.art.cantidad_actual = values.cantidad_actual
      }
    });

    console.log("Cant: " + this.art.cantidad_actual);
    console.log("id: " + this.id);

    this.invService.removeCant(this.art.cantidad_actual , this.id);
  }

}
