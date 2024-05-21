import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import {
  LoginModule,
  LoginRoutingModule,
  CadastroPjRoutingModule,
  CadastroUsuarioModule
} from './autenticacao';
import { AppRoutingModule } from './app-routing.module';
import {
  UsuarioModule,
  UsuarioRoutingModule
} from './usuario';
import {
  AdminModule,
  AdminRoutingModule
} from './admin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    LoginModule,
    LoginRoutingModule,
    CadastroUsuarioModule,
    CadastroPjRoutingModule,
    UsuarioModule,
    UsuarioRoutingModule,
    AdminModule,
    AdminRoutingModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
