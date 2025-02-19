import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  private apiUrl = 'http://localhost:3000/api/presupuestos';

  constructor(private http: HttpClient) { }


  getPresupuestos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getPresupuestoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addPresupuesto(presupuesto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, presupuesto);
  }

  updatePresupuesto(id: number, presupuesto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, presupuesto);
  }

  deletePresupuesto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
