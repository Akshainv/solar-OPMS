// work-assignment.component.ts
import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent],
  templateUrl: './work-assignment.component.html',
  styleUrls: ['./work-assignment.component.css']  // fixed plural
})
export class WorkAssignmentComponent {}