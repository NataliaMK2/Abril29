import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AltaProductoComponent } from './lista-productos/altaproductos/altaproductos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,AltaProductoComponent,ListaProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
