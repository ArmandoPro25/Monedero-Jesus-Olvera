import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroGastoService } from '../../registro-gasto.service';

@Component({
  selector: 'app-registro-gasto',
  templateUrl: './registro-gasto.component.html',
  styleUrls: ['./registro-gasto.component.css']
})
export class RegistroGastoComponent implements OnInit{
  gastoForm: FormGroup;
  gastos: any[] = []; //aqui se almacenara la lista de gastos
  editingGasto: any = null;
  

  constructor(private fb: FormBuilder, private registroGastoService: RegistroGastoService){
    this.gastoForm = this.fb.group({
      Descripcion: ['', Validators.required],
      monto: ['',[Validators.required, Validators.min(0)]],
      fecha: ['', Validators.required],
      metodo: ['', Validators.required],
      Id_Tipo: ['', Validators.required],
      Id_Presupuesto: ['', Validators.required],
      Id_Usuario: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.loadGastos(); //carga los gastos existentes, cuando se inicializa el componente
  }

  loadGastos(): void{
    this.registroGastoService.getGastos().subscribe(
      (data: any[]) => {
        this.gastos = data;
        console.log('Gastos cargados:', this.gastos);
      },
      (error) => {
        console.error('Error al cargar los gastos:',error);
      }
    );
  }
  
  //cargar el gasto en el formulario para editarlo
  editGasto(gasto: any): void {
// Si la fecha no está en formato 'YYYY-MM-DD', se convierte al formato que angular pueda desplegar
if (gasto.fecha) {
  // Convierte la fecha al formato 'YYYY-MM-DD' si es necesario
  const formattedDate = new Date(gasto.fecha).toISOString().substring(0, 10);
  gasto.fecha = formattedDate;
}
    this.editingGasto = gasto;
    this.gastoForm.patchValue(gasto);
  }


  onSubmit(): void {
    if (this.gastoForm.valid) {
      if (this.editingGasto) {
        // Actualizar gasto existente
        this.registroGastoService.updateGasto(this.editingGasto.Id_Gasto, this.gastoForm.value).subscribe(
          () => {
            console.log('Gasto actualizado exitosamente');
            alert('Gasto actualizado exitosamente');
            this.loadGastos(); // Recargar lista de gastos
            this.resetForm(); // Resetear formulario y estado de edición
          },
          error => {
            console.error('Error al actualizar el gasto', error);
            alert('Error al actualizar el gasto');
          }
        );
      } else {
        // Crear nuevo gasto
        this.registroGastoService.addGasto(this.gastoForm.value).subscribe(
          () => {
            console.log('Gasto agregado exitosamente');
            alert('Gasto agregado exitosamente');
            this.loadGastos(); // Recargar lista de gastos
            this.resetForm(); // Resetear formulario
          },
          error => {
            console.error('Error al agregar el gasto:', error);
            alert('Error al agregar el gasto');
          }
        );
      }
    }
  }

  //metodo para obtener un gasto por su ID
  loadGastoById(id: number): void {
    this.registroGastoService.getGastoById(id).subscribe(
      (gasto) => {
        console.log('Gasto encontrado:', gasto);
        this.editGasto(gasto);
      },
      (error) => {
        console.error('Error al cargar el gasto:', error);
      }
    );
  }


    //metodo para cancelar la edicion (opcional)
    cancelEdit(): void {
      this.editingGasto = null;
      this.gastoForm.reset();
    }

    deleteGasto(id: number): void {
      this.registroGastoService.deleteGasto(id).subscribe(
        () => {
          console.log('Gasto eliminado exitosamente');
          alert('Gasto eliminado exitosamente');
          this.loadGastos(); //refresca la lista despues de eliminarlo
        },
        (error) => {
          console.error('Error al eliminar el gasto:',error);
          alert('Error al eliminar el gasto');
        }
      );
    }

    //resetear el formulario y el estado de edicion
    private resetForm(): void {
      this.gastoForm.reset();
      this.editingGasto = null;
    }
  }

