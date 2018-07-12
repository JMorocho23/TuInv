import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { Articulo } from '../../app/models/item/item.model';
import { InventoryService } from '../../app/services/inventory/inventory.service'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  articulo: Articulo = {
      codigo: '',
      nombre: '',
      cantidad_actual: 0,
      descripcion: '',
      precio: 0

  }

  result: BarcodeScanResult;
  prevResults=[];
  


  constructor( private camera: Camera, private invService:InventoryService, private barcode: BarcodeScanner, public navCtrl: NavController) {

  }

  async takePhoto(){

    try{
     
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      const result = await this.camera.getPicture(options);

      const image =  `data:image/png;base64,${result}`;

        console.log(this.articulo.codigo);

        const pictures = storage().ref(`artImgs/${this.articulo.codigo}`);

       pictures.putString(image, 'data_url');
       pictures.getDownloadURL().then(function(url) {
        console.log(url);
      });
  

    }   
    catch (error) { 
      console.log(error);

    }


  }


  async scanBarcode() {
    try {

      const options: BarcodeScannerOptions = {
        prompt: 'Apunte su cámara al código de barras',
        torchOn: false  
      } 

      this.result = await this.barcode.scan(options)
      this.articulo.codigo = this.result.text;

      this.prevResults.push(this.result.text);
      console.log(this.prevResults);



    }
    catch (error) {
      console.log(error);

    }
  }

  addArt(articulo: Articulo){
    this.invService.newArticulo(articulo)
    this.navCtrl.setRoot('AboutPage');
  }

}
