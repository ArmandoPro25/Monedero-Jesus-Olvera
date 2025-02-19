import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroGastoService {
  private apiUrl = 'http://localhost:3000/api/registroGastos';

  constructor(private http: HttpClient) { }

  //metodo para agregar un registro de gastos 
  addGasto(gasto: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/add`, gasto);
  }

  //Metodo para obtener todos los registros de gastos
  getGastos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  //Metodo para eliminar un registro de gasto
  deleteGasto(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  };

  //metodo para actualizar un registro de gasto
  updateGasto(id: number, gasto: any): Observable<any>
  {
    return this.http.put(`${this.apiUrl}/update/${id}`, gasto);
  }

  //Metodo para obtener un registro de gasto por ID
  getGastoById(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener el gasto por ID:', err);
        return throwError(err);
      })
    );
  }
}