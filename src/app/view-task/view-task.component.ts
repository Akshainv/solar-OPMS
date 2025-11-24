import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [EmployeeSidebarComponent, CommonModule],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {
  
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  downloadDocument(docName: string): void {
    console.log('Downloading:', docName);
    // Implement download logic here
    alert(`Downloading: ${docName}`);
  }
}