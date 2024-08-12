import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from "../service/auth-service.service";
import { SignUpRequest } from "../dto/SignUpRequest";
import { Role } from "../enum/Role";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet
  ],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      const signUpRequest: SignUpRequest = this.signUpForm.value;
      const role: Role = this.signUpForm.value.role as Role;
      this.authService.signUp(role, signUpRequest).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
