import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsServie: GifsService) {
  }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;


    //si el valor es igual 0 no hace nada
    //trim() => limpia los espacios de adelante y atras
    if(valor.trim().length === 0) {
      return
    }

    this.gifsServie.buscarGifs(valor);
    //Borra lo que ingresamos por teclado luego de presionar enter
    this.txtBuscar.nativeElement.value = '';
  }





}
