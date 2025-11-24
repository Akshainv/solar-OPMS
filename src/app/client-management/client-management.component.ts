import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-client-management',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {

  // Client Information Only
  clientName: string = '';
  clientId: string = '';     // ⭐ Added this
  contactNumber: string = '';
  clientEmail: string = '';
  clientPassword: string = '';
  landmark: string = '';
  googleMapLink: string = '';

  clients: any[] = [];

  successMessage: string | null = null;
  loadErrorMessage: string | null = null;
  opErrorMessage: string | null = null;

  userName: string = 'Admin';
  private readonly apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user_name') || 'Admin';
    this.loadClients();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  loadClients() {
    const headers = this.getAuthHeaders();
    this.http.get<any>(`${this.apiUrl}/clients`, { headers }).subscribe({
      next: (response) => {
        this.clients = Array.isArray(response)
          ? response
          : response.clients || [];
      },
      error: (err) => {
        this.loadErrorMessage = 'Failed to load clients.';
      }
    });
  }

  addClient() {
    this.successMessage = null;
    this.opErrorMessage = null;

    if (!this.clientName || !this.clientEmail || !this.clientPassword || !this.contactNumber) {
      this.opErrorMessage = 'Please fill all required client information fields.';
      return;
    }

    const clientData = {
      clientId: this.clientId || null,   // ⭐ include clientId
      name: this.clientName,
      email: this.clientEmail,
      password: this.clientPassword,
      role: 'client',
      contactNumber: this.contactNumber,
      landmark: this.landmark,
      googleMapLink: this.googleMapLink
    };

    this.http.post<any>(`${this.apiUrl}/auth/register`, clientData).subscribe({
      next: (response) => {
        this.successMessage = 'Client added successfully!';
        this.clearForm();
        setTimeout(() => this.successMessage = null, 3000);
        this.loadClients();
      },
      error: (err) => {
        this.opErrorMessage = err.error?.message || 'Failed to add client.';
      }
    });
  }

  deleteClient(clientId: string) {
    const headers = this.getAuthHeaders();
    this.http.delete<any>(`${this.apiUrl}/clients/${clientId}`, { headers }).subscribe({
      next: () => {
        this.successMessage = 'Client deleted successfully!';
        this.clients = this.clients.filter(c => c._id !== clientId);
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: () => {
        this.opErrorMessage = 'Failed to delete client.';
      }
    });
  }

  clearForm() {
    this.clientName = '';
    this.clientId = '';     // ⭐ clear added field
    this.contactNumber = '';
    this.clientEmail = '';
    this.clientPassword = '';
    this.landmark = '';
    this.googleMapLink = '';
  }

  clearMessages() {
    this.successMessage = null;
    this.loadErrorMessage = null;
    this.opErrorMessage = null;
  }
}
