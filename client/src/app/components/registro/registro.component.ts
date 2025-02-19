import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario: Usuario = {
    Id_Usuario: 0,
    nombre: '',
    apellido: '',
    email: '',
    Ocupacion: '',
    password: '',
    confirmar_password: '',
    Id_TipoUser: 0
  };

  //propiedad para almacenar multiples usuarios
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onSubmit(){
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      res => {
        console.log('Usuario registrado:', res);
        this.router.navigate(['/home']);
      },
      err => {
        console.error('Error registrando el usuario:', err);
      }
    );
  }

  cargarUsuario(id: number): void {
    this.usuarioService.getUsuarioById(id).subscribe(
      (data: Usuario) => {
        this.usuario = data;
      },
      err => {
        console.error('Error al cargar el usuario:', err);
      }
    );
  }

  eliminarUsuario(Id_Usuario: number){
    this.usuarioService.eliminarUsuario(Id_Usuario).subscribe(
      res => {
        console.log('Usuario eliminado:', res);
        this.obtenerUsuarios(); //recargar la lista despues de la eliminacion 
      },
      err => {
        console.error('Error al eliminar el usuario:', err);
      }
    );
  }

  /* ngOnInit(): void {
    const Id_Usuario = this.route.snapshot.params['Id_Usuario'];
    this.obtenerUsuario(Id_Usuario);
  }*/
 ngOnInit(): void {}

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      err => {
        console.error('Error al obtener usuarios:', err);
      }
    );
  } 

  actualizarUsuario() {
    if (this.usuario.Id_Usuario !== undefined) {
      this.usuarioService.actualizarUsuario(this.usuario.Id_Usuario, this.usuario).subscribe(
        res => {
          console.log('Usuario actualizado:', res);
          this.router.navigate(['/usuarios']); // Redirigir a la lista de usuarios
        },
        err => {
          console.error('Error al actualizar el usuario:', err);
        }
      );
    } else {
      console.error('Id_Usuario no está definido');
    }
  }

}
