// work-progress-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

interface WorkProgressStatus {
  feasibility: 'Applied' | 'Received' | '';
  feasibilityRemarks: string;
  agreement: 'Not Completed' | 'Completed' | 'Signed' | '';
  agreementRemarks: string;
  giStructure: 'Completed' | 'Not Completed' | '';
  giStructureRemarks: string;
  pvInstallation: 'Completed' | 'Not Completed' | '';
  pvInstallationRemarks: string;
  inverter: 'Completed' | 'Not Completed' | '';
  inverterRemarks: string;
  netMeter: 'Completed' | 'Not Completed' | '';
  netMeterRemarks: string;
  commissioned: 'Completed' | 'Not Completed' | '';
  commissionedRemarks: string;
}

interface Project {
  id: string;
  clientName: string;
  clientContact: string;
  siteLocation: string;
  employeeName: string;
  deadline: string;
  status: string;
  workProgress: WorkProgressStatus;
}

interface Certificate {
  id: string;
  type: string;
  uploadedTime: string;
  icon: string;
  iconType: string;
  fileUrl?: string;
}

@Component({
  selector: 'app-work-progress-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent],
  templateUrl: './work-progress-detail.component.html',
  styleUrls: ['./work-progress-detail.component.css']
})
export class WorkProgressDetailComponent implements OnInit {
  projectId: string = '';
  project: Project | null = null;
  isEditMode: boolean = false;
  userRole: string = 'admin'; // This should come from auth service
  certificates: Certificate[] = [];

  // Mock data - replace with actual service call
  mockProjects: Project[] = [
    {
      id: '#1043',
      clientName: 'John Doe',
      clientContact: '+91 9876543210',
      siteLocation: 'Solar Park A, Kochi',
      employeeName: 'Rajesh Kumar',
      deadline: 'Oct 25, 2025',
      status: 'In Progress',
      workProgress: {
        feasibility: 'Received',
        feasibilityRemarks: 'Feasibility report approved by client. All technical requirements met.',
        agreement: 'Completed',
        agreementRemarks: 'Agreement signed and documented. All legal formalities completed.',
        giStructure: 'Completed',
        giStructureRemarks: 'Structure installed successfully with proper foundation and alignment.',
        pvInstallation: 'Completed',
        pvInstallationRemarks: 'All solar panels installed and tested. Power output meets specifications.',
        inverter: 'Not Completed',
        inverterRemarks: 'Inverter delivery pending. Expected arrival within 3 days.',
        netMeter: 'Not Completed',
        netMeterRemarks: 'Waiting for KSEB approval for net meter installation.',
        commissioned: 'Not Completed',
        commissionedRemarks: 'Final commissioning scheduled after net meter installation.'
      }
    },
    {
      id: '#1044',
      clientName: 'Sarah Smith',
      clientContact: '+91 9876543211',
      siteLocation: 'Residential Site B, Ernakulam',
      employeeName: 'Anita Menon',
      deadline: 'Oct 15, 2025',
      status: 'Completed',
      workProgress: {
        feasibility: 'Received',
        feasibilityRemarks: 'Feasibility study completed successfully.',
        agreement: 'Signed',
        agreementRemarks: 'All agreements signed and legal documentation completed.',
        giStructure: 'Completed',
        giStructureRemarks: 'All structural work completed as per design specifications.',
        pvInstallation: 'Completed',
        pvInstallationRemarks: 'Solar panel installation completed and verified.',
        inverter: 'Completed',
        inverterRemarks: 'Inverter installed and configured properly.',
        netMeter: 'Completed',
        netMeterRemarks: 'Net meter installed and connected to grid.',
        commissioned: 'Completed',
        commissionedRemarks: 'System fully commissioned and operational. Client training completed.'
      }
    }
  ];

  // Mock certificates data
  mockCertificates: { [key: string]: Certificate[] } = {
    '#1043': [
      {
        id: '1',
        type: 'Progress Report',
        uploadedTime: '2 hours ago',
        icon: 'fa-file-alt',
        iconType: 'report',
        fileUrl: '/documents/progress-report.pdf'
      },
      {
        id: '2',
        type: 'Site Photos',
        uploadedTime: '5 hours ago',
        icon: 'fa-camera',
        iconType: 'photo',
        fileUrl: '/documents/site-photos.zip'
      },
      {
        id: '3',
        type: 'Safety Certificate',
        uploadedTime: '1 day ago',
        icon: 'fa-certificate',
        iconType: 'certificate',
        fileUrl: '/documents/safety-cert.pdf'
      }
    ],
    '#1044': [
      {
        id: '4',
        type: 'Completion Certificate',
        uploadedTime: '3 days ago',
        icon: 'fa-certificate',
        iconType: 'certificate',
        fileUrl: '/documents/completion-cert.pdf'
      },
      {
        id: '5',
        type: 'Final Inspection Report',
        uploadedTime: '5 days ago',
        icon: 'fa-file-alt',
        iconType: 'report',
        fileUrl: '/documents/final-inspection.pdf'
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProjectDetails();
    this.loadCertificates();
    
    // Check user role - this should come from your auth service
    // this.userRole = this.authService.getUserRole();
  }

  loadProjectDetails(): void {
    // Replace with actual API call
    this.project = this.mockProjects.find(p => p.id === this.projectId) || null;
    
    if (!this.project) {
      // Initialize with empty data if not found
      this.project = {
        id: this.projectId,
        clientName: '',
        clientContact: '',
        siteLocation: '',
        employeeName: '',
        deadline: '',
        status: 'In Progress',
        workProgress: {
          feasibility: '',
          feasibilityRemarks: '',
          agreement: '',
          agreementRemarks: '',
          giStructure: '',
          giStructureRemarks: '',
          pvInstallation: '',
          pvInstallationRemarks: '',
          inverter: '',
          inverterRemarks: '',
          netMeter: '',
          netMeterRemarks: '',
          commissioned: '',
          commissionedRemarks: ''
        }
      };
    }
  }

  loadCertificates(): void {
    // Replace with actual API call
    this.certificates = this.mockCertificates[this.projectId] || [];
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProgress(): void {
    if (!this.project) return;

    // Here you would call your API to save the progress
    console.log('Saving progress:', this.project.workProgress);
    
    // Simulate API call
    setTimeout(() => {
      alert('Progress updated successfully!');
      this.isEditMode = false;
    }, 500);
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.loadProjectDetails(); // Reload original data
  }

  goBack(): void {
    this.router.navigate(['/admin-project-tracking']);
  }

  getCompletionPercentage(): number {
    if (!this.project) return 0;

    const wp = this.project.workProgress;
    let completed = 0;
    let total = 7;

    if (wp.feasibility === 'Received') completed++;
    if (wp.agreement === 'Completed' || wp.agreement === 'Signed') completed++;
    if (wp.giStructure === 'Completed') completed++;
    if (wp.pvInstallation === 'Completed') completed++;
    if (wp.inverter === 'Completed') completed++;
    if (wp.netMeter === 'Completed') completed++;
    if (wp.commissioned === 'Completed') completed++;

    return Math.round((completed / total) * 100);
  }

  getStatusClass(status: string): string {
    if (status === 'Completed' || status === 'Received' || status === 'Signed') {
      return 'completed';
    }
    return 'not-completed';
  }

  getStatusIcon(status: string): string {
    if (status === 'Completed' || status === 'Received' || status === 'Signed') {
      return 'fa-check-circle';
    }
    return 'fa-times-circle';
  }

  downloadCertificate(certificate: Certificate): void {
    // Implement download functionality
    console.log('Downloading certificate:', certificate);
    
    // In a real application, you would trigger file download
    // For example:
    // window.open(certificate.fileUrl, '_blank');
    
    alert(`Downloading ${certificate.type}...`);
  }
}