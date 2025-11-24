// service-request-management.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

interface ServiceRequest {
  id: number;
  projectId: string;
  projectName: string;
  clientName: string;
  issueType: string;
  description: string;
  submittedDate: string;
  status: string;
  isRead: boolean;
}

@Component({
  selector: 'app-service-request-management',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './service-request-management.component.html',
  styleUrls: ['./service-request-management.component.css']
})
export class ServiceRequestManagementComponent {
  serviceRequests: ServiceRequest[] = [
    {
      id: 1,
      projectId: '1034',
      projectName: '123 Solar Ave, Kochi',
      clientName: 'John Doe',
      issueType: 'Equipment Malfunction',
      description: 'Inverter showing error code E03. Power output has dropped by 40% over the last week.',
      submittedDate: '2024-11-10',
      status: 'Pending',
      isRead: false
    },
    {
      id: 2,
      projectId: '1028',
      projectName: '456 Green St, Ernakulam',
      clientName: 'Sarah Smith',
      issueType: 'Maintenance Required',
      description: 'Routine maintenance due. Last servicing was 6 months ago. Need panel cleaning and inspection.',
      submittedDate: '2024-11-09',
      status: 'In Progress',
      isRead: false
    },
    {
      id: 3,
      projectId: '1045',
      projectName: '789 Energy Blvd, Thrippunithura',
      clientName: 'Michael Johnson',
      issueType: 'Inspection Request',
      description: 'Request for warranty inspection before expiry. Some panels showing discoloration.',
      submittedDate: '2024-11-08',
      status: 'Pending',
      isRead: false
    },
    {
      id: 4,
      projectId: '1019',
      projectName: '321 Sunlight Rd, Kadavanthra',
      clientName: 'Emily Davis',
      issueType: 'Maintenance Required',
      description: 'Battery backup not working properly. Need immediate attention as monsoon season approaching.',
      submittedDate: '2024-11-07',
      status: 'Completed',
      isRead: false
    },
    {
      id: 5,
      projectId: '1050',
      projectName: '555 Solar Plaza, Aluva',
      clientName: 'Robert Wilson',
      issueType: 'Other',
      description: 'Monitoring system offline. Cannot access real-time data through mobile app.',
      submittedDate: '2024-11-06',
      status: 'Pending',
      isRead: false
    }
  ];

  get unreadCount(): number {
    return this.serviceRequests.filter(req => !req.isRead).length;
  }

  get unreadRequests(): ServiceRequest[] {
    return this.serviceRequests.filter(req => !req.isRead);
  }

  markAsRead(request: ServiceRequest): void {
    request.isRead = true;
  }

  updateStatus(request: ServiceRequest, newStatus: string): void {
    request.status = newStatus;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-progress';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  }

  getIssueTypeIcon(issueType: string): string {
    switch (issueType) {
      case 'Maintenance Required': return 'fa-wrench';
      case 'Equipment Malfunction': return 'fa-exclamation-triangle';
      case 'Inspection Request': return 'fa-clipboard-check';
      case 'Other': return 'fa-question-circle';
      default: return 'fa-tools';
    }
  }
}