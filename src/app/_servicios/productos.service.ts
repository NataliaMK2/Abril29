import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../_modelo/Producto';
import { entorno } from '../_entorno/entorno';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url:string = `${entorno.HOST}/productos`;
  productoCambio = new Subject<Producto[]>();

  constructor(private http:HttpClient) { }

  listar(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url)
    .pipe(
      map(data => {return data.sort((a, b) => a.idProducto-b.idProducto);})
    );
  }

  listarPorId(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  alta(p: Producto) {
    console.log('ha llegado al servicio'+p.nombreProducto);
    return this.http.post(this.url,p);
  }

  modificar(p: Producto) {
    return this.http.put<Producto>(`${this.url}/${p.idProducto}`, p);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
