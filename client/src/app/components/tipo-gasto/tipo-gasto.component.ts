import { Component, OnInit } from '@angular/core';
import { TipoGastoServiceService } from '../../tipo-gasto-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-gasto',
  templateUrl: './tipo-gasto.component.html',
  styleUrls: ['./tipo-gasto.component.css']
})
export class TipoGastoComponent implements OnInit{

  tiposGasto: any[] = []; //lista de tipos de gasto
  descripcion: string = ''; //descripcion del nuevo tipo de gasto
  editarId: number | null = null;
  tipoGastoForm: FormGroup;

  constructor(private tipoGastoService: TipoGastoServiceService, private fb: FormBuilder) {
    this.tipoGastoForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  //se define ngOnInit como un metodo de la clase, no dentro del constructor
  ngOnInit(): void {
      console.log('Componente TipoGasto inicializado');
      this.loadTiposGasto();//llama a la funcion aqui
  }

  //metodo para cargar los tipos de gasto desde el servicio
    loadTiposGasto(){
      this.tipoGastoService.getTiposGastos().subscribe(
        data => this.tiposGasto = data,
        error => console.error('Error al cargar los tipos de gasto', error)
      );
    }

    //metodo para agregar un nuevo tipo de gasto
    addTipoGasto(){
      if (this.descripcion.trim()){
        this.tipoGastoService.addTipoGasto(this.descripcion).subscribe(
          () => {
            this.loadTiposGasto();//recarga la lista
            this.descripcion = ''; //limpiar el campo de texto
                    },
                    error => console.error('Error al agregar el tipo de gasto', error)
        );
      }
    }

    //metodo para eliminar un tipo de gasto
    deleteTipoGasto(id:number){
      this.tipoGastoService.deleteTipoGasto(id).subscribe(
        () => this.loadTiposGasto(), //recarga la lista despues de eliminar
        error => console.error('Error al eliminar el tipo de gasto', error)
      );
    }

    startEdit(id: number, descripcion: string){
      this.editarId = id;
      this.tipoGastoForm.setValue({ descripcion });
    }

    updateTipoGasto(){
      if (this.tipoGastoForm.valid && this.editarId !== null){
        this.tipoGastoService.updateTipoGasto(this.editarId, this.tipoGastoForm.value.descripcion).subscribe(
          () => {
            this.loadTiposGasto();
            this.editarId = null;
            this.tipoGastoForm.reset();
          },
          error => console.error('Error al actualizar el tipo de gasto', error)
        );
      }
    }
  }
