import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';

// Define un tipo para la respuesta de login
interface LoginResponse {
  token: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuarios/login';

  constructor(private http: HttpClient) { }

  // Verificar si localStorage está disponible
  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Obtener el usuario actual desde localStorage
  getUsuarioActual(): Usuario | null {
    if (this.isLocalStorageAvailable()) {
      const usuarioStr = localStorage.getItem('usuario'); // Suponiendo que almacenas el usuario en localStorage
      return usuarioStr ? JSON.parse(usuarioStr) : null;
    }
    return null;
  }

  // Método de login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      map(response => {
        // Asumiendo que el backend devuelve el token y la información del usuario
        if (response.token) {
          this.setToken(response.token);
          this.setUsuario(response.usuario); // Guardar la información del usuario
        }
        return response;
      }),
      catchError(err => {
        console.error('Error en el login:', err);
        return throwError(err);
      })
    );
  }

  // Guardar usuario en localStorage
  setUsuario(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('usuario');
  }
}
