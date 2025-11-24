import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  clientName: string;
  clientContact: string;
  siteLocation: string;
  status: string;
  progress: number;
  completedDate: string;
  employeeName: string;
}

@Component({
  selector: 'app-completed-projects',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.css']
})
export class CompletedProjectsComponent {
  projects: Project[] = [
    {
      id: '#1044',
      clientName: 'Sarah Smith',
      clientContact: '+91 9876543211',
      siteLocation: 'Residential Site B, Ernakulam',
      status: 'Completed',
      progress: 100,
      completedDate: 'Oct 15, 2025',
      employeeName: 'Anita Menon'
    },
    {
      id: '#1040',
      clientName: 'David Brown',
      clientContact: '+91 9876543215',
      siteLocation: 'Solar Park F, Alappuzha',
      status: 'Completed',
      progress: 100,
      completedDate: 'Oct 10, 2025',
      employeeName: 'Rajesh Kumar'
    },
    {
      id: '#1038',
      clientName: 'Lisa Anderson',
      clientContact: '+91 9876543216',
      siteLocation: 'Commercial Complex G, Kottayam',
      status: 'Completed',
      progress: 100,
      completedDate: 'Oct 05, 2025',
      employeeName: 'Suresh Nair'
    },
    {
      id: '#1035',
      clientName: 'James Martin',
      clientContact: '+91 9876543217',
      siteLocation: 'Industrial Park H, Palakkad',
      status: 'Completed',
      progress: 100,
      completedDate: 'Sep 28, 2025',
      employeeName: 'Priya Thomas'
    },
    {
      id: '#1032',
      clientName: 'Jennifer Lee',
      clientContact: '+91 9876543218',
      siteLocation: 'Residential Tower I, Kollam',
      status: 'Completed',
      progress: 100,
      completedDate: 'Sep 20, 2025',
      employeeName: 'Arun Varghese'
    }
  ];

  constructor(private router: Router) {}

  // Dynamic Stats
  getTotalProjects(): number {
    return this.projects.length;
  }

  getInProgress(): number {
    return this.projects.filter(p => p.status === 'In Progress').length;
  }

  getCompleted(): number {
    return this.projects.filter(p => p.status === 'Completed').length;
  }

  getPending(): number {
    return this.projects.filter(p => p.status === 'Pending').length;
  }

  // Status class for badge
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'in progress': return 'in-progress';
      case 'completed': return 'completed';
      case 'pending': return 'pending';
      case 'on hold': return 'on-hold';
      default: return 'pending';
    }
  }

  // Status icon
  getStatusIcon(status: string): string {
    switch (status) {
      case 'In Progress': return 'fa-spinner';
      case 'Completed': return 'fa-check-circle';
      case 'Pending': return 'fa-clock';
      case 'On Hold': return 'fa-pause-circle';
      default: return 'fa-clock';
    }
  }

  // Navigate to service details page
  viewServiceDetails(projectId: string): void {
    this.router.navigate(['/service-details', projectId]);
  }
}