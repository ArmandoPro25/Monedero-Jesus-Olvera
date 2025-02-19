import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { GastosListaComponent } from './components/gastos-lista/gastos-lista.component';
import { RegistroGastoComponent } from './components/registro-gasto/registro-gasto.component';
import { TipoGastoComponent } from './components/tipo-gasto/tipo-gasto.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { CostosService } from './services/costos.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    NosotrosComponent,
    GastosListaComponent,
    RegistroGastoComponent,
    TipoGastoComponent,
    PresupuestoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CostosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
