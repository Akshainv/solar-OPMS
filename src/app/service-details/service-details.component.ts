import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  clientName: string;
  clientContact: string;
  siteLocation: string;
  installationDate: string;
  employeeName: string;
}

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, FormsModule],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  projectId: string = '';
  
  projectDetails: ProjectDetails = {
    id: '#1044',
    clientName: 'Sarah Smith',
    clientContact: '+91 9876543211',
    siteLocation: 'Residential Site B, Ernakulam',
    installationDate: 'Oct 15, 2024',
    employeeName: 'Anita Menon'
  };

  serviceRecords: ServiceRecord[] = [
    { serviceNumber: 1, year: 1, serviceMonth: 'Apr 2025', isCompleted: true, completedDate: '2025-04-15', remarks: 'Initial service completed' },
    { serviceNumber: 2, year: 1, serviceMonth: 'Oct 2025', isCompleted: true, completedDate: '2025-10-20', remarks: 'Regular maintenance done' },
    { serviceNumber: 3, year: 2, serviceMonth: 'Apr 2026', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 4, year: 2, serviceMonth: 'Oct 2026', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 5, year: 3, serviceMonth: 'Apr 2027', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 6, year: 3, serviceMonth: 'Oct 2027', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 7, year: 4, serviceMonth: 'Apr 2028', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 8, year: 4, serviceMonth: 'Oct 2028', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 9, year: 5, serviceMonth: 'Apr 2029', isCompleted: false, completedDate: '', remarks: '' },
    { serviceNumber: 10, year: 5, serviceMonth: 'Oct 2029', isCompleted: false, completedDate: '', remarks: '' }
  ];

  editingService: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
  }

  startEdit(serviceNumber: number): void {
    this.editingService = serviceNumber;
  }

  cancelEdit(): void {
    this.editingService = null;
  }

  updateService(service: ServiceRecord): void {
    if (service.isCompleted && !service.completedDate) {
      alert('Please enter the service completion date');
      return;
    }

    console.log('Updating service:', service);
    this.editingService = null;
    alert('Service record updated successfully!');
  }

  goBack(): void {
    this.router.navigate(['/completed-projects']);
  }
}
