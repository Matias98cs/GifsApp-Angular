import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  //obtenemos el historial la copia del gifsservice para poder
  //mostrar en el html
  get historial() {
    return this.gifsService.historial;
  }

  //importamos los servicios en el constructor
  constructor(private gifsService: GifsService) {

  }


  buscar(item : string) {
    this.gifsService.buscarGifs(item)
  }

}
