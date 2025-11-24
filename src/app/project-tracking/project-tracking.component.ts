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
  deadline: string;
  employeeName: string;
}

@Component({
  selector: 'app-project-tracking',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './project-tracking.component.html',
  styleUrls: ['./project-tracking.component.css']
})
export class ProjectTrackingComponent {
  projects: Project[] = [
    {
      id: '#1043',
      clientName: 'John Doe',
      clientContact: '+91 9876543210',
      siteLocation: 'Solar Park A, Kochi',
      status: 'In Progress',
      progress: 65,
      deadline: 'Oct 25, 2025',
      employeeName: 'Rajesh Kumar'
    },
    {
      id: '#1044',
      clientName: 'Sarah Smith',
      clientContact: '+91 9876543211',
      siteLocation: 'Residential Site B, Ernakulam',
      status: 'Completed',
      progress: 100,
      deadline: 'Oct 15, 2025',
      employeeName: 'Anita Menon'
    },
    {
      id: '#1045',
      clientName: 'Michael Johnson',
      clientContact: '+91 9876543212',
      siteLocation: 'Commercial Plaza C, Thrissur',
      status: 'Pending',
      progress: 20,
      deadline: 'Nov 05, 2025',
      employeeName: 'Suresh Nair'
    },
    {
      id: '#1046',
      clientName: 'Emily Davis',
      clientContact: '+91 9876543213',
      siteLocation: 'Industrial Park D, Calicut',
      status: 'In Progress',
      progress: 45,
      deadline: 'Oct 30, 2025',
      employeeName: 'Priya Thomas'
    },
    {
      id: '#1047',
      clientName: 'Robert Wilson',
      clientContact: '+91 9876543214',
      siteLocation: 'Residential Complex E, Kannur',
      status: 'On Hold',
      progress: 35,
      deadline: 'Nov 10, 2025',
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

  // Navigate to work progress detail page
  viewWorkProgress(projectId: string): void {
    this.router.navigate(['/work-progress-detail', projectId]);
  }
}