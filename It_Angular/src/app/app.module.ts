// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';
import {AuthInterceptor} from './interceptor/auth-interceptor'; // Ensure correct path

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginComponent,
    SignUpComponent,
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useValue: AuthInterceptor, multi: true }
  ],
  bootstrap: [] // Ensure AppComponent is bootstrapped
})
export class AppModule { }
