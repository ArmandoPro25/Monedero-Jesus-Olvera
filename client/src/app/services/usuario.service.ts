import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // Cambia la URL según tu configuración del backend

  constructor(private http: HttpClient) {}

 //metodo para registrar un nuevo usuario
 registrarUsuario(usuario: Usuario): Observable<any>{
  return this.http.post<any>(`${this.apiUrl}/create`, usuario);
 }

 //metodo para eliminar un usuario por ID
  eliminarUsuario(Id_Usuario: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${Id_Usuario}`);
  }

  //metodo para actualizar un usuario por ID
  actualizarUsuario(Id_Usuario: number, usuario: Usuario): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${Id_Usuario}`, usuario);
  }

 //metodo para consultar todos los usuarios
 getUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.apiUrl}`);
 }

 //metodo para consultar un usuario por ID
 getUsuarioById(id: number): Observable<Usuario>{
  return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
 }
}
