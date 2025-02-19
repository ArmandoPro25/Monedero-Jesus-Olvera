import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      res => {
        this.authService.setToken(res.token);
        this.router.navigate(['/home']); //redirigir al dashboard u otra pagina
      },
      err => {
        this.errorMessage = 'Credenciales invalidas. Intentelo de nuevo.';
      }
    );
  }
}
