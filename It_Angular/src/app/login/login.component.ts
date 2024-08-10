import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { LoginRequest } from '../dto/LoginRequest';
import { NgIf } from "@angular/common";
import { Role } from '../enum/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = this.loginForm.value;

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        const { token, role } = response;
        console.log('Received token:', token); // Debugging
        console.log('Received role:', role); // Debugging
        localStorage.setItem('jwt', token);

        // Navigate based on user role
        switch (role) {
          case Role.ADMIN:
            this.router.navigate(['/dashboard']);
            break;
          case Role.USER:
            this.router.navigate(['/user']);
            break;
          case Role.TECHNICIAN:
            this.router.navigate(['/technician']);
            break;
          default:
            console.log('Unknown role:', role); // Debugging
            this.router.navigate(['/access-denied']);
            break;
        }
      },
      error: (err) => {
        console.error('Login error:', err); // Debugging
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
