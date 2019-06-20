import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ItemDescripcion } from 'src/app/interfaces/item-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ItemDescripcion;
  id: string;

  constructor(
    private route: ActivatedRoute,
    public itemService: ProductosService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      // console.log(params);
      this.itemService.getItem(params.id)
      .subscribe( ( item: ItemDescripcion ) => {
        // console.log(item);
        this.id = params.id;
        this.producto = item;
      });
    });
  }

}
