import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../services/presupuestos.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.css'
})
export class PresupuestoComponent implements OnInit{
  presupuestos: any[] = [];
  presupuesto: any = {};
  editingPresupuestoId: number | null = null;

  constructor(private presupuestoService: PresupuestosService) {}

  ngOnInit(): void {
    this.loadPresupuestos();
  }

  loadPresupuestos(): void {
    this.presupuestoService.getPresupuestos().subscribe(
      data => this.presupuestos = data,
      error => console.error('Error al cargar presupuestos:', error)
    );
  }

  addPresupuesto(): void {
    if (this.editingPresupuestoId) {
      // Actualizar presupuesto
      this.presupuestoService.updatePresupuesto(this.editingPresupuestoId, this.presupuesto).subscribe(
        () => {
          this.loadPresupuestos();
          this.resetForm();
        },
        error => console.error('Error al actualizar presupuesto:', error)
      );
    } else {
      // Agregar nuevo presupuesto
      this.presupuestoService.addPresupuesto(this.presupuesto).subscribe(
        () => {
          this.loadPresupuestos();
          this.resetForm();
        },
        error => console.error('Error al agregar presupuesto:', error)
      );
    }
  }

  editPresupuesto(presupuesto: any): void {
    this.presupuesto = { ...presupuesto };
    this.editingPresupuestoId = presupuesto.Id_Presupuesto;
  }

  deletePresupuesto(id: string): void {
    this.presupuestoService.deletePresupuesto(parseInt(id, 10)).subscribe(
      () => this.loadPresupuestos(),
      error => console.error('Error al eliminar presupuesto:', error)
    );
  }

  resetForm(): void {
    this.presupuesto = {};
    this.editingPresupuestoId = null;
  }


}
