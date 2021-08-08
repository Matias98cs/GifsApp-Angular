import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'LkfLYucJqIlxms760p4F9L4g8c8uZ6Pj';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];


  //creamos un get para mandar una copia del historial Array
  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    //Muestra lo que tenemos en resyultados guardado, muestra las img cuando recargamos
    //resultados
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if( localStorage.getItem('historial') ) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')! ) ;
    // }
  }


  //Colocamos al principio del array el  elemento buscado
  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    //Includes() => va a decir si existe o se incluye lo que yo quiero poner
    //Si no lo incluye, entonces ahi es dodne yo lo voy a insertar
    if (!this._historial.includes(query)) {
      //Inserta al inicio del array
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '15')
      .set('q', query);

    //Get hace la peticion a la Api con sus parametros y anade lo buscado en una arreglo
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        //Inserta al localStorage los resultados para asi mostrarlos
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })
  }
}
