import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoServiceService {
  private apiUrl = 'http://localhost:3000/api/tipoGastos';

  constructor(private http: HttpClient) { }

  //metodo para agregar un tipo de gasto
  addTipoGasto(descripcion: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/add`,{ Descripcion: descripcion });
  }

  //metodo para obtener todos los tipos de gastos
  getTiposGastos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  //metodo para eliminar un tipo de gasto
  deleteTipoGasto(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  //Metodo para actualizar un tipo de gasto
  updateTipoGasto(id: number, descripcion: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/update/${id}`,{ Descripcion: descripcion });
  }

  //metodo para obtener un tipo de gasto por ID
  getTipoGastoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
