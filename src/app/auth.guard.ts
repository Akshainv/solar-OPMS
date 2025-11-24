import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Check if the user is logged in
  if (!authService.isLoggedIn()) {
    // If not logged in, redirect to the login page
    return router.parseUrl('/');
  }

  // Get the role required for the route from the route's data object
  const requiredRole = route.data['role'];

  // 2. If a role is required, check if the user has it
  if (requiredRole && !authService.hasRole(requiredRole)) {
    // If user is logged in but lacks the role, redirect to a default dashboard
    const userRole = authService.getUserRole();
    if (userRole === 'admin') {
      return router.parseUrl('/admin-dashboard');
    } else if (userRole === 'employee') {
      return router.parseUrl('/employee-dashboard');
    } else if (userRole === 'client') {
      return router.parseUrl('/client-dashboard');
    }
    
    // Fallback if role is unknown/unhandled (shouldn't happen with correct logic)
    return router.parseUrl('/'); 
  }

  // 3. Authorized
  return true;
};