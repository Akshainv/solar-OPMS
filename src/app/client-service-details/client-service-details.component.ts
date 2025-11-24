import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientSidebarComponent } from '../client-sidebar/client-sidebar.component';
import { CommonModule } from '@angular/common';

interface ServiceRecord {
  serviceNumber: number;
  year: number;
  serviceMonth: string;
  isCompleted: boolean;
  completedDate: string;
  remarks: string;
}

interface ProjectDetails {
  id: string;
  siteLocation: string;
  installationDate: string;
  technicianName: string;
  installationStatus: string;
}

@Component({
  selector: 'app-client-service-details',
  standalone: true,
  imports: [CommonModule, ClientSidebarComponent],
  templateUrl: './client-service-details.component.html',
  styleUrls: ['./client-service-details.component.css']
})
export class ClientServiceDetailsComponent implements OnInit {
  projectId: string = '';
  
  projectDetails: ProjectDetails = {
    id: '#1034',
    siteLocation: '123 Solar Ave, Kochi',
    installationDate: 'Oct 22, 2025',
    technicianName: 'John Smith',
    installationStatus: 'Completed'
  };

  serviceRecords: ServiceRecord[] = [
    { serviceNumber: 1, year: 1, serviceMonth: 'Apr 2026', isCompleted: true, completedDate: '2026-04-15', remarks: 'Initial service completed successfully' },
    { serviceNumber: 2, year: 1, serviceMonth: 'Oct 2026', isCompleted: true, completedDate: '2026-10-20', remarks: 'Regular maintenance performed' },
    { serviceNumber: 3, year: 2, serviceMonth: 'Apr 2027', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 4, year: 2, serviceMonth: 'Oct 2027', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 5, year: 3, serviceMonth: 'Apr 2028', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 6, year: 3, serviceMonth: 'Oct 2028', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 7, year: 4, serviceMonth: 'Apr 2029', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 8, year: 4, serviceMonth: 'Oct 2029', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 9, year: 5, serviceMonth: 'Apr 2030', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 10, year: 5, serviceMonth: 'Oct 2030', isCompleted: false, completedDate: '', remarks: '' }
  ];

  completedCount: number = 0;
  pendingCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.calculateStats();
  }

  calculateStats(): void {
    this.completedCount = this.serviceRecords.filter(s => s.isCompleted).length;
    this.pendingCount = this.serviceRecords.filter(s => !s.isCompleted).length;
  }

  goBack(): void {
    this.router.navigate(['/my-projects']);
  }
}