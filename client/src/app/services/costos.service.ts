import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostosService {
  private storageKey = 'gastos';

  constructor(private http : HttpClient) {}
  
  private getGastosStorage(): any {
    const gastos = localStorage.getItem(this.storageKey);
    return gastos ? JSON.parse(gastos) : {};
  }

  private saveGastosStorage(gastos: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(gastos));
  }

  getGastos(correo: string): Observable<any[]> {
    const gastos = this.getGastosStorage();
    return of(gastos[correo] || []);
  }

  agregarGasto(correo: string, gasto: any): Observable<void> {
    return new Observable(observer => {
      const gastos = this.getGastosStorage();
      if (!gastos[correo]) {
        gastos[correo] = [];
      }
      gastos[correo].push(gasto);
      this.saveGastosStorage(gastos);
      observer.next();
      observer.complete();
    });
  }

  eliminarGasto(correo: string, index: number): Observable<void> {
    return new Observable(observer => {
      const gastos = this.getGastosStorage();
      if (gastos[correo]) {
        gastos[correo].splice(index, 1);
        this.saveGastosStorage(gastos);
      }
      observer.next();
      observer.complete();
    });
  }

  generarReporte(correo: string, mes: number, año: number): Observable<any> {
    return new Observable(observer => {
      const gastos = this.getGastosStorage()[correo] || [];
      const reporte = gastos.filter((gasto: any) => {
        const fecha = new Date(gasto.fecha);
        return fecha.getMonth() === mes && fecha.getFullYear() === año;
      });
      const total = reporte.reduce((acc: number, gasto: any) => acc + gasto.monto, 0);
      observer.next({ reporte, total });
      observer.complete();
    });
  }
  API_URI = 'http:localhost:3000/src/data' //para el front end, con archivos json
}

  //API_URI = 'http:localhost:3000/api'; //para el back end
 


