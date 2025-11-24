import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [AdminSidebarComponent, RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  // Form fields
  employeeId: string = '';
  employeeName: string = '';
  designation: string = '';
  employeeEmail: string = '';
  employeePassword: string = '';
  contactNumber: string = '';
  joiningDate: string = '';

  // Employee list
  employees: any[] = [];

  // Messages
  successMessage: string | null = null;
  // errorMessage now split: loadErrorMessage (from GET) and opErrorMessage (from add/update ops)
  loadErrorMessage: string | null = null;
  opErrorMessage: string | null = null;

  userName: string = 'Admin';

  private readonly apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Get username from localStorage if available
    this.userName = localStorage.getItem('user_name') || 'Admin';
    // Immediately show any locally cached employees so they persist across refresh/close
    try {
      const cacheJson = localStorage.getItem('employees_cache');
      const cache: any[] = cacheJson ? JSON.parse(cacheJson) : [];
      if (cache && cache.length > 0) {
        this.employees = cache;
      }
    } catch (e) {
      console.warn('Failed to read employees_cache:', e);
    }

    // Load employees from server (will merge/clean cache when results return)
    this.loadEmployees();
  }

  // Get authorization headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Load all employees from the backend
  loadEmployees() {
    console.log('Loading employees...');
    
    const headers = this.getAuthHeaders();
    
    this.http.get<any>(`${this.apiUrl}/employees`, { headers }).subscribe({
      next: (response) => {
        console.log('Employees loaded:', response);
        // Accept multiple possible response shapes from backend:
        // - an array (e.g. [ {..}, {..} ])
        // - { employees: [...] }
        // - { data: [...] }
        // - { users: [...] }
        let employeesList: any[] = [];
        if (Array.isArray(response)) {
          employeesList = response;
        } else if (response) {
          employeesList = response.employees || response.data || response.users || [];
        }

        // Merge with any locally cached employees (fallback for cases where GET does not return recently added items)
        const cacheJson = localStorage.getItem('employees_cache');
        const cache: any[] = cacheJson ? JSON.parse(cacheJson) : [];

        if ((!employeesList || employeesList.length === 0) && cache.length > 0) {
          // If server returned nothing but cache exists, show cache so UI doesn't lose added entries.
          this.employees = cache;
        } else {
          // Merge cache entries that are not present on server (match by _id or email)
          const merged = [...employeesList];
          cache.forEach(c => {
            const exists = merged.some(s => (s._id && c._id && s._id === c._id) || (s.email && c.email && s.email === c.email));
            if (!exists) merged.unshift(c);
          });

          this.employees = merged;

          // Remove cached items that the server now returns (clean cache)
          const remainingCache = cache.filter(c => !this.employees.some(s => (s._id && c._id && s._id === c._id) || (s.email && c.email && s.email === c.email)));
          if (remainingCache.length !== cache.length) {
            localStorage.setItem('employees_cache', JSON.stringify(remainingCache));
          }
        }

        console.log('Total employees:', this.employees.length);
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        // If we have a local cache, prefer showing the cached list and suppress the load error.
        const cacheJson = localStorage.getItem('employees_cache');
        const cache: any[] = cacheJson ? JSON.parse(cacheJson) : [];
        if (cache && cache.length > 0) {
          // Don't overwrite opErrorMessage; just log and keep the cache visible.
          console.warn('Server load failed but cache present, suppressing load error.');
          this.loadErrorMessage = null;
          return;
        }

        if (err.status === 401) {
          this.loadErrorMessage = 'Session expired. Please login again.';
        } else {
          this.loadErrorMessage = 'Failed to load employees. Please refresh the page.';
        }
      }
    });
  }

  // Add new employee
  addEmployee() {
    this.successMessage = null;
    this.opErrorMessage = null;

    // Validation
    if (!this.employeeId || !this.employeeName || !this.designation || !this.employeeEmail || 
        !this.employeePassword || !this.joiningDate) {
      this.opErrorMessage = 'Please fill all required fields.';
      return;
    }

    const employeeData = {
      employeeId: this.employeeId,
      name: this.employeeName,
      email: this.employeeEmail,
      password: this.employeePassword,
      role: 'employee',
      designation: this.designation,
      contactNumber: this.contactNumber,
      joiningDate: this.joiningDate
    };

    console.log('Adding employee:', employeeData);

    this.http.post<any>(`${this.apiUrl}/auth/register`, employeeData).subscribe({
      next: (response) => {
        console.log('Employee added successfully:', response);
        this.successMessage = 'Employee added successfully!';
        this.clearForm();

        // Try to update the UI immediately using the API response when possible.
        const created = response?.employee || response?.user || response?.data || response?.newEmployee || response;

        if (created && (created._id || created.id || (typeof created === 'object' && !Array.isArray(created)))) {
          const normalized = {
            _id: created._id || created.id,
            employeeId: created.employeeId || employeeData.employeeId,
            name: created.name || created.fullName || employeeData.name,
            email: created.email || employeeData.email,
            designation: created.designation || created.role || employeeData.designation,
            joiningDate: created.joiningDate || employeeData.joiningDate,
            contactNumber: created.contactNumber || employeeData.contactNumber
          };

          // Prepend so the new user is visible immediately.
          this.employees = [normalized, ...this.employees];

          // Save to local cache so it persists across refresh even if the server GET doesn't immediately return it
          try {
            const cacheJson = localStorage.getItem('employees_cache');
            const cacheArr: any[] = cacheJson ? JSON.parse(cacheJson) : [];
            const exists = cacheArr.some(c => (c._id && normalized._id && c._id === normalized._id) || (c.email && normalized.email && c.email === normalized.email));
            if (!exists) {
              cacheArr.unshift(normalized);
              localStorage.setItem('employees_cache', JSON.stringify(cacheArr));
            }
          } catch (e) {
            console.warn('Failed to update employees_cache:', e);
          }
        } else {
          // Fallback: reload list from server (keeps previous behavior)
          setTimeout(() => this.loadEmployees(), 300);
        }

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        this.opErrorMessage = err.error?.message || 'Failed to add employee. Please try again.';
      }
    });
  }

  // Delete employee
  deleteEmployee(employeeId: string): void {
    if (confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      this.successMessage = null;
      this.opErrorMessage = null;

      const headers = this.getAuthHeaders();

      this.http.delete<any>(`${this.apiUrl}/employees/${employeeId}`, { headers }).subscribe({
        next: (response) => {
          console.log('Employee deleted successfully:', response);
          this.successMessage = 'Employee deleted successfully!';

          // Remove from local array immediately
          this.employees = this.employees.filter(emp => emp._id !== employeeId);

          // Update cache
          try {
            const cacheJson = localStorage.getItem('employees_cache');
            const cache: any[] = cacheJson ? JSON.parse(cacheJson) : [];
            const updatedCache = cache.filter(c => c._id !== employeeId);
            localStorage.setItem('employees_cache', JSON.stringify(updatedCache));
          } catch (e) {
            console.warn('Failed to update employees_cache:', e);
          }

          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          if (err.status === 401) {
            this.opErrorMessage = 'Session expired. Please login again.';
          } else {
            this.opErrorMessage = err.error?.message || 'Failed to delete employee. Please try again.';
          }
        }
      });
    }
  }

  // Clear form fields
  clearForm() {
    this.employeeId = '';
    this.employeeName = '';
    this.designation = '';
    this.employeeEmail = '';
    this.employeePassword = '';
    this.contactNumber = '';
    this.joiningDate = '';
  }

  // Clear messages
  clearMessages() {
    this.successMessage = null;
    this.loadErrorMessage = null;
    this.opErrorMessage = null;
  }
}