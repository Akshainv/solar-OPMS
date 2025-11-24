// employee-dashboard.component.ts
import { Component } from '@angular/core';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [EmployeeSidebarComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

}