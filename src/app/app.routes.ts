import { Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AltaProductoComponent } from './lista-productos/altaproductos/altaproductos.component';

export const routes: Routes = [
    {path:'', component:ListaProductosComponent, children:
[{path:'alta', component:AltaProductoComponent},
{path:'edicion/:id', component:AltaProductoComponent}

]}
];
