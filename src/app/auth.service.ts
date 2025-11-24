// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  /**
   * Retrieves the stored JWT token.
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Retrieves the stored user role.
   */
  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  /**
   * Checks if the user is logged in (has a token).
   */
  isLoggedIn(): boolean {
    // In a real app, you'd also check if the token is expired.
    return !!this.getToken();
  }

  /**
   * Checks if the current user has the required role.
   * @param requiredRole The role string to check against.
   */
  hasRole(requiredRole: string): boolean {
    return this.getUserRole() === requiredRole;
  }

  /**
   * Clears session storage and navigates to the login page.
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name'); // Clear name too
    this.router.navigate(['/']);
  }
}