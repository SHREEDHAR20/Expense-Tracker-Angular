import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sighnup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './sighnup.html',
  styleUrls: ['./sighnup.css']
})
export class Sighnup implements OnInit {
  signupForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please complete the form correctly.';
      return;
    }

    const userData = this.signupForm.value;

    this.http.post<any>('http://localhost:3000/api/sighnup', userData).subscribe({
      next: () => {
        alert('Signup successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Signup failed. Try again.';
      }
    });
  }
}
