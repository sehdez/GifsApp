import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/interface.component';


@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private _historial : string[] = [];
  private apiKey     : string = '3JBXC3DNuvZcmYB0ZYYWyuIDjAExXQnu';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  // TODO: Cambiar any por su tipo correspondiente
  public resultados: Gif [] = []

  get historial(){
    return  [...this._historial];
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')!);
    // }
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) ||[];
    
  }

  buscarGifs (query: string){
 
    query = query.trim().toLowerCase();

    
    
    if (!this._historial.includes( query ) ){
      this._historial.unshift( query ); //unshift es para insertalo al inicio del arreglo
      this._historial = this._historial.splice(0,10); 

      
      localStorage.setItem('historial', JSON.stringify(this._historial)  );
      
    }


    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)



    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params})
    .subscribe((resp )=>{

      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados) )
    })
    
    





    //Hacer la petición en JS
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=3JBXC3DNuvZcmYB0ZYYWyuIDjAExXQnu&q=vegueta')
    //   .then( resp => {
    //     resp.json().then(data =>{
    //       console.log(data);
    //     })
    //   } )
    
    
    
    
  }

}
