import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SignUpComponent,
    LoginComponent,
    AppComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
