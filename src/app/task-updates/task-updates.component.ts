// task-updates.component.ts
import { Component } from '@angular/core';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-task-updates',
  standalone: true,
  imports: [EmployeeSidebarComponent],
  templateUrl: './task-updates.component.html',
  styleUrls: ['./task-updates.component.css']
})
export class TaskUpdatesComponent {

}