// login.component.ts (updated)
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  // Ensure HttpClientModule and CommonModule are imported
  imports: [FormsModule, HttpClientModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string | null = null;
  
  private readonly apiUrl = '/api/auth/login';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.errorMessage = null;

    if (!this.email || !this.password || !this.role) {
      this.errorMessage = 'Please enter all fields.';
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post<any>(this.apiUrl, credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        
        // Store token for session management
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);
        localStorage.setItem('user_name', response.name);

        // Navigate based on successful role check
        if (response.role === 'client') {
          this.router.navigate(['/client-dashboard']);
        } else if (response.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'employee') {
          this.router.navigate(['/employee-dashboard']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }

  clearMessages() {
    this.errorMessage = null;
  }
}