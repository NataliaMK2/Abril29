import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductosService } from '../../_servicios/productos.service';
import { Producto } from '../../_modelo/Producto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-altaproducto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './altaproductos.component.html',
  styleUrls: ['./altaproductos.component.css']
})
export class AltaProductoComponent implements OnInit {

  form: FormGroup;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicio: ProductosService
  ) {
    this.form = new FormGroup({
      'idProducto': new FormControl(0),
      'nombreProducto': new FormControl(''),
      'precioUnitario': new FormControl(0),
      'unidadesEnStock': new FormControl(0),
      'categoria': new FormControl(0)
    });
  }

  ngOnInit(): void {

    this.route.params
      .subscribe(data => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.formaFormulario();
      });
  }

  formaFormulario() {
    if (this.edicion) {
      this.servicio.listarPorId(this.id)
        .subscribe(data => {
          this.form = new FormGroup({
            'idProducto': new FormControl(data.idProducto),
            'nombreProducto': new FormControl(data.nombreProducto),
            'precioUnitario': new FormControl(data.precioUnitario),
            'unidadesEnStock': new FormControl(data.unidadesStock),
            'categoria': new FormControl(data.categoria)
          });
        });
    }
  }

  operar() {
    let p: Producto = {
      'idProducto': this.form.value['idProducto'],
      'nombreProducto': this.form.value['nombreProducto'],
      'precioUnitario': this.form.value['precioUnitario'],
      'unidadesStock': this.form.value['unidadesEnStock'],
      'categoria': this.form.value['categoria']
    };

    if (this.edicion) {
      this.servicio.modificar(p)
        .subscribe(() => {
          this.servicio.listar()
            .subscribe(data => {
              this.servicio.productoCambio.next(data);
            });
        });
    } else {
      this.servicio.alta(p)
        .subscribe(() => {
          this.form.patchValue(p);
          this.servicio.productoCambio.next([p]);
        });
    }
    this.router.navigate(['']);
  }
}
