import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  items: Item[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://portafolio-ce1fe.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Item[]) => {
      console.log(resp);
      this.items = resp;
      this.cargando = false;
    });
  }
}
