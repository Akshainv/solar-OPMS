// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { WorkAssignmentComponent } from './work-assignment/work-assignment.component';
import { ProjectTrackingComponent } from './project-tracking/project-tracking.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { TaskUpdatesComponent } from './task-updates/task-updates.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { QrServiceRequestsComponent } from './qr-service-requests/qr-service-requests.component';
import { ClientNotificationsComponent } from './client-notifications/client-notifications.component';
import { SupportContactComponent } from './support-contact/support-contact.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ServiceRequestManagementComponent } from './service-request-management/service-request-management.component';
import { WorkProgressDetailComponent } from './work-progress-detail/work-progress-detail.component';
import { CompletedProjectsComponent } from './completed-projects/completed-projects.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ClientServiceDetailsComponent } from './client-service-details/client-service-details.component';

// Import the authGuard
import { authGuard } from './auth.guard'; 

export const routes: Routes = [
  // Public route
  { path: '', component: LoginComponent },

  // -------------------------
  // ADMIN Routes (Role: 'admin')
  // -------------------------
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'admin-work-assignment', 
    component: WorkAssignmentComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'admin-project-tracking', 
    component: ProjectTrackingComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'completed-projects', 
    component: CompletedProjectsComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'work-progress-detail/:id', 
    component: WorkProgressDetailComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'service-details/:id', 
    component: ServiceDetailsComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'service-requests-management', 
    component: ServiceRequestManagementComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'employee-management', 
    component: EmployeeManagementComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'client-management', 
    component: ClientManagementComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },
  { 
    path: 'project-management', 
    component: ProjectManagementComponent,
    canActivate: [authGuard], 
    data: { role: 'admin' } 
  },

  // -------------------------
  // EMPLOYEE Routes (Role: 'employee')
  // -------------------------
  { 
    path: 'employee-dashboard', 
    component: EmployeeDashboardComponent,
    canActivate: [authGuard], 
    data: { role: 'employee' } 
  },
  { 
    path: 'my-tasks', 
    component: MyTasksComponent,
    canActivate: [authGuard], 
    data: { role: 'employee' } 
  },
  { 
    path: 'task-updates', 
    component: TaskUpdatesComponent,
    canActivate: [authGuard], 
    data: { role: 'employee' } 
  },
  { 
    path: 'notifications', 
    component: NotificationsComponent,
    canActivate: [authGuard], 
    data: { role: 'employee' } 
  },
  { 
    path: 'view-task/:id', 
    component: ViewTaskComponent,
    canActivate: [authGuard], 
    data: { role: 'employee' } 
  },

  // -------------------------
  // CLIENT Routes (Role: 'client')
  // -------------------------
  { 
    path: 'client-dashboard', 
    component: ClientDashboardComponent,
    canActivate: [authGuard], 
    data: { role: 'client' } 
  },
  { 
    path: 'my-projects', 
    component: MyProjectsComponent,
    canActivate: [authGuard], 
    data: { role: 'client' } 
  },
  { 
    path: 'client-service-details/:id', 
    component: ClientServiceDetailsComponent,
    canActivate: [authGuard], 
    data: { role: 'client' } 
  },
  { 
    path: 'qr-service-requests', 
    component: QrServiceRequestsComponent,
    canActivate: [authGuard], 
    data: { role: 'client' } 
  },
  { 
    path: 'client-notifications', 
    component: ClientNotificationsComponent,
    canActivate: [authGuard], 
    data: { role: 'client' } 
  },
  { 
    path: 'support-contact', 
    component: SupportContactComponent,
    canActivate: [authGuard], 
    data: { role: 'client' } 
  }
];