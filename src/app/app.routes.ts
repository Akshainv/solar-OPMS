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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },

  // Admin
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-work-assignment', component: WorkAssignmentComponent },
  { path: 'admin-project-tracking', component: ProjectTrackingComponent },
  { path: 'completed-projects', component: CompletedProjectsComponent },
  { path: 'work-progress-detail/:id', component: WorkProgressDetailComponent },
  { path: 'service-details/:id', component: ServiceDetailsComponent },
  { path: 'service-requests-management', component: ServiceRequestManagementComponent },
  { path: 'employee-management', component: EmployeeManagementComponent },
  { path: 'client-management', component: ClientManagementComponent },
  { path: 'project-management', component: ProjectManagementComponent },

  // Employee
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  { path: 'task-updates', component: TaskUpdatesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'view-task/:id', component: ViewTaskComponent },

  // Client
  { path: 'client-dashboard', component: ClientDashboardComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'client-service-details/:id', component: ClientServiceDetailsComponent },
  { path: 'qr-service-requests', component: QrServiceRequestsComponent },
  { path: 'client-notifications', component: ClientNotificationsComponent },
  { path: 'support-contact', component: SupportContactComponent },

  // Wildcard route for 404 refresh fix
  { path: '**', redirectTo: 'login' }
];
