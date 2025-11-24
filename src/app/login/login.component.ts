import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  login() {
    this.errorMessage = null;

    if (!this.email || !this.password || !this.role) {
      this.errorMessage = 'Please enter all fields.';
      return;
    }

    // 🔹 No authentication — direct role-based navigation
    if (this.role === 'client') {
      this.router.navigate(['/client-dashboard']);
    } 
    else if (this.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } 
    else if (this.role === 'employee') {
      this.router.navigate(['/employee-dashboard']);
    } 
    else {
      this.errorMessage = 'Invalid role selected!';
    }
  }

  clearMessages() {
    this.errorMessage = null;
  }
}
