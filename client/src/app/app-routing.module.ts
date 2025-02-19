import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { GastosListaComponent } from './components/gastos-lista/gastos-lista.component';
import { RegistroGastoComponent } from './components/registro-gasto/registro-gasto.component';
import { TipoGastoComponent } from './components/tipo-gasto/tipo-gasto.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { authGuard } from './guards/auth.guard';

//En esta parte se agregan todas las rutas de los archivos que se vayan creando
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent },
  {path: 'home', component: HomeComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'gastos-lista', component: GastosListaComponent},
  {path: 'registro-gasto', component: RegistroGastoComponent, canActivate: [authGuard]},
  {path: 'tipos-gasto', component: TipoGastoComponent, canActivate: [authGuard]},
  {path: 'presupuesto', component: PresupuestoComponent, canActivate: [authGuard]},
  {path: '', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
