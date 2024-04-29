import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../_servicios/productos.service';
import { Producto } from '../_modelo/Producto';
import { CommonModule } from '@angular/common';
import { AltaProductoComponent } from './altaproductos/altaproductos.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [AltaProductoComponent, RouterModule],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor(private servicio: ProductosService) { }
  productos: Producto[] = [];

  ngOnInit(): void {
    this.servicio.productoCambio
      .subscribe((data: Producto[]) => {
        this.productos = data;
      });

    this.servicio.listar()
      .subscribe(datos => {
        this.productos = datos;
        console.log("entra");
      });
  }

  eliminar(id: number) {
    this.servicio.eliminar(id)
      .subscribe(() => {
        this.servicio.listar()
          .subscribe(data => this.servicio.productoCambio.next(data));
      });
  }

  recibirAviso(listaActualizada: Observable<Producto[]>) {
    console.warn("regresa el padre ----");
    // listaActualizada.subscribe(data => this.productos = data);

    this.servicio.listar()
      .subscribe(datos => {
        this.productos = datos;
        console.log("entra");
      });
  }
}
