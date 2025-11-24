import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  // Project Details
  projectName: string = '';
  projectId: string = '';
  siteLocation: string = '';
  startDate: string = '';
  deadline: string = '';
  projectDescription: string = '';
  ksebConsumerNumber: string = '';
  ksebSection: string = '';
  capacity: string = '';
  type: string = '';
  dateOfCommissioning: string = '';

  // Edit mode
  isEditMode: boolean = false;
  editingProjectId: string | null = null;

  // Project list
  projects: any[] = [];

  // Messages
  successMessage: string | null = null;
  loadErrorMessage: string | null = null;
  opErrorMessage: string | null = null;
  userName: string = 'Admin';

  // Loading state
  isLoading: boolean = false;

  private readonly apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user_name') || 'Admin';
    
    // Load cache first to show something immediately
    try {
      const cacheJson = localStorage.getItem('projects_cache');
      if (cacheJson) {
        const cache: any[] = JSON.parse(cacheJson);
        if (cache && cache.length > 0) {
          this.projects = cache;
          console.log('Loaded projects from cache:', cache.length);
        }
      }
    } catch (e) {
      console.warn('Failed to read projects_cache:', e);
    }
    
    // Then try to load from server (this will update if successful)
    this.loadProjects();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  loadProjects() {
    console.log('Loading projects from server...');
    this.isLoading = true;
    
    // Get current cache
    let cache: any[] = [];
    try {
      const cacheJson = localStorage.getItem('projects_cache');
      cache = cacheJson ? JSON.parse(cacheJson) : [];
    } catch (e) {
      console.warn('Failed to read cache:', e);
    }
    
    const headers = this.getAuthHeaders();
   
    this.http.get<any>(`${this.apiUrl}/projects`, { headers }).subscribe({
      next: (response) => {
        console.log('Projects loaded successfully from server:', response);
        this.isLoading = false;
        this.loadErrorMessage = null; // Clear any error
        
        let projectsList: any[] = [];
        if (Array.isArray(response)) {
          projectsList = response;
        } else if (response) {
          projectsList = response.projects || response.data || [];
        }
        
        // Use server data if available, otherwise keep cache
        if (projectsList && projectsList.length > 0) {
          this.projects = projectsList;
          // Update cache with fresh server data
          try {
            localStorage.setItem('projects_cache', JSON.stringify(projectsList));
          } catch (e) {
            console.warn('Failed to update cache:', e);
          }
        } else if (cache.length > 0) {
          // Keep using cache if server returns empty
          this.projects = cache;
        }
        
        console.log('Total projects:', this.projects.length);
      },
      error: (err) => {
        console.error('Error loading projects from server:', err);
        this.isLoading = false;
        
        // If we have cache, use it silently (no error message)
        if (cache && cache.length > 0) {
          console.warn('Using cached data due to server error');
          this.projects = cache;
          this.loadErrorMessage = null; // Important: Don't show error
          return;
        }
        
        // Only show error if we have NO cached data at all
        if (err.status === 401) {
          this.loadErrorMessage = 'Session expired. Please login again.';
        } else if (err.status === 0) {
          this.loadErrorMessage = 'Unable to connect to server. Please check your connection.';
        } else {
          this.loadErrorMessage = 'Failed to load projects from server.';
        }
      }
    });
  }

  addProject() {
    this.successMessage = null;
    this.opErrorMessage = null;

    // Validation
    if (!this.projectName || !this.projectId || !this.siteLocation || !this.startDate ||
        !this.deadline || !this.ksebConsumerNumber || !this.ksebSection ||
        !this.capacity || !this.type || !this.dateOfCommissioning) {
      this.opErrorMessage = 'Please fill all required fields.';
      return;
    }

    const projectData = {
      projectName: this.projectName,
      projectId: this.projectId,
      siteLocation: this.siteLocation,
      startDate: this.startDate,
      deadline: this.deadline,
      projectDescription: this.projectDescription,
      ksebConsumerNumber: this.ksebConsumerNumber,
      ksebSection: this.ksebSection,
      capacity: this.capacity,
      type: this.type,
      dateOfCommissioning: this.dateOfCommissioning
    };

    console.log('Adding project:', projectData);
    const headers = this.getAuthHeaders();
    this.http.post<any>(`${this.apiUrl}/projects`, projectData, { headers }).subscribe({
      next: (response) => {
        console.log('Project added successfully:', response);
        this.successMessage = 'Project added successfully!';
        
        const created = response?.project || response?.data || response;
        const normalized = {
          _id: created._id || created.id || Date.now().toString(),
          projectName: created.projectName || projectData.projectName,
          projectId: created.projectId || projectData.projectId,
          siteLocation: created.siteLocation || projectData.siteLocation,
          capacity: created.capacity || projectData.capacity,
          type: created.type || projectData.type,
          startDate: created.startDate || projectData.startDate,
          deadline: created.deadline || projectData.deadline,
          projectDescription: created.projectDescription || projectData.projectDescription,
          ksebConsumerNumber: created.ksebConsumerNumber || projectData.ksebConsumerNumber,
          ksebSection: created.ksebSection || projectData.ksebSection,
          dateOfCommissioning: created.dateOfCommissioning || projectData.dateOfCommissioning
        };
        
        // Add to beginning of array
        this.projects = [normalized, ...this.projects];
        
        // Update cache
        try {
          localStorage.setItem('projects_cache', JSON.stringify(this.projects));
        } catch (e) {
          console.warn('Failed to update cache:', e);
        }
        
        this.clearForm();
        
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        console.error('Error adding project:', err);
        this.opErrorMessage = err.error?.message || 'Failed to add project. Please try again.';
      }
    });
  }

  editProject(project: any) {
    this.isEditMode = true;
    this.editingProjectId = project._id || project.id;
    
    this.projectName = project.projectName;
    this.projectId = project.projectId;
    this.siteLocation = project.siteLocation;
    this.startDate = project.startDate;
    this.deadline = project.deadline;
    this.projectDescription = project.projectDescription || '';
    this.ksebConsumerNumber = project.ksebConsumerNumber;
    this.ksebSection = project.ksebSection;
    this.capacity = project.capacity;
    this.type = project.type;
    this.dateOfCommissioning = project.dateOfCommissioning;

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateProject() {
    this.successMessage = null;
    this.opErrorMessage = null;

    if (!this.projectName || !this.projectId || !this.siteLocation || !this.startDate ||
        !this.deadline || !this.ksebConsumerNumber || !this.ksebSection ||
        !this.capacity || !this.type || !this.dateOfCommissioning) {
      this.opErrorMessage = 'Please fill all required fields.';
      return;
    }

    const projectData = {
      projectName: this.projectName,
      projectId: this.projectId,
      siteLocation: this.siteLocation,
      startDate: this.startDate,
      deadline: this.deadline,
      projectDescription: this.projectDescription,
      ksebConsumerNumber: this.ksebConsumerNumber,
      ksebSection: this.ksebSection,
      capacity: this.capacity,
      type: this.type,
      dateOfCommissioning: this.dateOfCommissioning
    };

    const headers = this.getAuthHeaders();
    this.http.put<any>(`${this.apiUrl}/projects/${this.editingProjectId}`, projectData, { headers }).subscribe({
      next: (response) => {
        console.log('Project updated successfully:', response);
        this.successMessage = 'Project updated successfully!';
        
        // Update in local array
        const index = this.projects.findIndex(p => (p._id === this.editingProjectId) || (p.id === this.editingProjectId));
        if (index !== -1) {
          this.projects[index] = { ...this.projects[index], ...projectData };
        }

        // Update cache
        try {
          localStorage.setItem('projects_cache', JSON.stringify(this.projects));
        } catch (e) {
          console.warn('Failed to update cache:', e);
        }

        this.clearForm();
        this.isEditMode = false;
        this.editingProjectId = null;

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        console.error('Error updating project:', err);
        this.opErrorMessage = err.error?.message || 'Failed to update project. Please try again.';
      }
    });
  }

  deleteProject(project: any) {
    if (!confirm(`Are you sure you want to delete project "${project.projectName}" (${project.projectId})?`)) {
      return;
    }

    const projectIdToDelete = project._id || project.id;
    const headers = this.getAuthHeaders();

    this.http.delete<any>(`${this.apiUrl}/projects/${projectIdToDelete}`, { headers }).subscribe({
      next: (response) => {
        console.log('Project deleted successfully:', response);
        this.successMessage = 'Project deleted successfully!';
        
        // Remove from local array
        this.projects = this.projects.filter(p => (p._id !== projectIdToDelete) && (p.id !== projectIdToDelete));

        // Update cache
        try {
          localStorage.setItem('projects_cache', JSON.stringify(this.projects));
        } catch (e) {
          console.warn('Failed to update cache:', e);
        }

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        console.error('Error deleting project:', err);
        this.opErrorMessage = err.error?.message || 'Failed to delete project. Please try again.';
      }
    });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingProjectId = null;
    this.clearForm();
  }

  clearForm() {
    this.projectName = '';
    this.projectId = '';
    this.siteLocation = '';
    this.startDate = '';
    this.deadline = '';
    this.projectDescription = '';
    this.ksebConsumerNumber = '';
    this.ksebSection = '';
    this.capacity = '';
    this.type = '';
    this.dateOfCommissioning = '';
  }

  clearMessages() {
    this.successMessage = null;
    this.loadErrorMessage = null;
    this.opErrorMessage = null;
  }
}