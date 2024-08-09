import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from "../service/auth-service.service";
import { LoginRequest } from "../dto/LoginRequest";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = this.loginForm.value as LoginRequest;

    this.authService.login(loginRequest).subscribe(
      response => {
        if (response && response.accessToken) {
          localStorage.setItem('jwt', response.accessToken);

          const role = response.user.role;

          if (role === 'ADMIN') {
            this.router.navigate(['/dashboard']).then(success => {
              if (!success) {
                console.error('Navigation to /dashboard failed.');
              }
            });
          } else if (role === 'USER') {
            this.router.navigate(['/user']).then(success => {
              if (!success) {
                console.error('Navigation to /user failed.');
              }
            });
          } else if (role === 'TECHNICIAN') {
            this.router.navigate(['/technician']).then(success => {
              if (!success) {
                console.error('Navigation to /technician failed.');
              }
            });
          } else {
            this.errorMessage = 'Role undefined: ' + role;
          }
        }
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to the server. Please try again later.';
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    );
  }
}
