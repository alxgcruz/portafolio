import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  items: Item[] = [];
  itemsFiltrado: Item[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( ( resolve, reject ) => {
      this.http.get('https://portafolio-ce1fe.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Item[]) => {
        this.items = resp;
        this.cargando = false;
        resolve();
      });
    } );
  }

  getItem( id: string ) {
    return this.http.get(`https://portafolio-ce1fe.firebaseio.com/productos/${ id }.json`);
  }

  buscarItem( termino: string) {

    if (this.items.length === 0) {
      this.cargarProductos().then ( () => {
        this.filtrar( termino );
      } );
    } else {
      this.filtrar( termino );
    }
  }

  private filtrar( termino: string ) {

    this.itemsFiltrado = [];
    termino = termino.toLocaleLowerCase();

    // 1er forma de filtrar
    // this.itemsFiltrado = this.items.filter( producto => {
    //   console.log(producto);
    //   if ( producto.titulo === termino ) {
    //     return producto;
    //   }
    // });
    // console.log(this.itemsFiltrado);


    // segunda forma de filtrar
    this.items.forEach( producto => {

      const tituloLower = producto.categoria.toLocaleLowerCase();
      const catLower = producto.titulo.toLocaleLowerCase();

      if ( tituloLower.indexOf( termino ) >= 0 || catLower.indexOf( termino ) >= 0) {

        this.itemsFiltrado.push(producto);

      }
    });

  }

}
