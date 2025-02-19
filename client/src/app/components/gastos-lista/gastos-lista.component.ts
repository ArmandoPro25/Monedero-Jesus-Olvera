import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CostosService } from '../../services/costos.service';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-gastos-lista',
  templateUrl: './gastos-lista.component.html',
  styleUrls: ['./gastos-lista.component.css']
})
export class GastosListaComponent implements OnInit {
  usuarioActual: Usuario | null = null;
  
  gasto = {
    fecha: '',
    descripcion: '',
    monto: 0
  };

  listaGastos: any[] = [];
  total = 0;

  constructor(
    private authService: AuthService,
    private costosService: CostosService,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.usuarioActual = this.authService.getUsuarioActual();
    if (!this.usuarioActual) {
      this.router.navigate(['/login']);
    } else {
      this.actualizarListaGastos();
    }
  }

  agregarGasto(): void {
    if (this.usuarioActual) {
      this.costosService.agregarGasto(this.usuarioActual.email, this.gasto).subscribe(() => {
        this.actualizarListaGastos();
        this.gasto = { fecha: '', descripcion: '', monto: 0 };
          this.total -= this.gasto.monto; //restar del monto
      });
    }
  }

  eliminarGasto(index: number): void {
    if (this.usuarioActual) {
      this.costosService.eliminarGasto(this.usuarioActual.email, index).subscribe(() => {
        this.actualizarListaGastos();
      });
    }
  }

  actualizarListaGastos(): void {
    if (this.usuarioActual) {
      this.costosService.getGastos(this.usuarioActual.email).subscribe(gastos => {
        this.listaGastos = gastos;
        this.calcularTotal();
      });
    }
  }

  calcularTotal(): void {
    this.total = this.listaGastos.reduce((acc, gasto) => acc + gasto.monto, 0);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
