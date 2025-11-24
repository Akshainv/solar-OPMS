import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [EmployeeSidebarComponent, CommonModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent {
  
  constructor(private router: Router) {}

  viewTask(taskId: string): void {
    this.router.navigate(['/view-task', taskId]);
  }
}