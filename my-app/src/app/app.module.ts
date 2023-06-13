import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './components/test/test.component';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { VillesComponent } from './components/villes/villes.component';
import { EreurComponent } from './components/ereur/ereur.component';
import { ModifierFormComponent } from './components/modifier-form/modifier-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminGestionComponent } from './components/admin-gestion/admin-gestion.component';
import { VilleComponent } from './components/ville/ville.component';
import { ProduitComponent } from './components/produit/produit.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { ProblemeComponent } from './components/probleme/probleme.component';
import { SolutionComponent } from './components/solution/solution.component';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    TestComponent,
    VillesComponent,
    EreurComponent,
    ModifierFormComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    AdminGestionComponent,
    VilleComponent,
    ProduitComponent,
    VehiculeComponent,
    ProblemeComponent,
    SolutionComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
