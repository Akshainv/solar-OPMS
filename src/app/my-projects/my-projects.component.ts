import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientSidebarComponent } from '../client-sidebar/client-sidebar.component';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  siteLocation: string;
  installationStatus: string;
  technicianName: string;
  installationDate: string;
}

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [ClientSidebarComponent, CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent {
  projects: Project[] = [
    {
      id: '#1034',
      siteLocation: '123 Solar Ave, Kochi',
      installationStatus: 'In Progress',
      technicianName: 'John Smith',
      installationDate: 'Oct 22, 2025'
    },
    {
      id: '#1028',
      siteLocation: '456 Green St, Ernakulam',
      installationStatus: 'Completed',
      technicianName: 'Sarah Johnson',
      installationDate: 'Oct 10, 2025'
    },
    {
      id: '#1045',
      siteLocation: '789 Energy Blvd, Thrippunithura',
      installationStatus: 'Pending',
      technicianName: 'Mike Davis',
      installationDate: 'Oct 28, 2025'
    },
    {
      id: '#1019',
      siteLocation: '321 Sunlight Rd, Kadavanthra',
      installationStatus: 'Completed',
      technicianName: 'John Smith',
      installationDate: 'Sep 30, 2025'
    },
    {
      id: '#1050',
      siteLocation: '555 Solar Plaza, Aluva',
      installationStatus: 'In Progress',
      technicianName: 'Emily Brown',
      installationDate: 'Nov 5, 2025'
    }
  ];

  constructor(private router: Router) {}

  viewServiceDetails(projectId: string): void {
    this.router.navigate(['/client-service-details', projectId]);
  }

  viewQRCode(projectId: string): void {
    console.log('View QR Code for project:', projectId);
    // Implement QR code viewing logic here
    alert(`QR Code for project ${projectId}`);
  }
}