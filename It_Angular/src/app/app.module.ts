import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routes';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from "@angular/material/dialog";
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    LoginComponent,
    SignUpComponent,
    AppComponent,
    BrowserAnimationsModule,
    MatDialogModule,
    AddEquipmentComponent,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useValue: AuthInterceptor, multi: true }
  ],
  bootstrap: []
})
export class AppModule { }
