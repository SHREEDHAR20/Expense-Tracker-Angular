import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
  if (this.loginForm.invalid) {
    this.errorMessage = 'Please fill in all required fields correctly.';
    return;
  }

  const loginData = this.loginForm.value;

  this.http.post<any>('http://localhost:3000/api/login', loginData).subscribe({
    next: (res) => {
      alert('Login successful!');
      console.log('Response:', res);
      this.router.navigate(['/expense-list']);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Login failed. Try again.';
    }
  });
}
}