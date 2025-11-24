// client-dashboard.component.ts
import { Component } from '@angular/core';
import { ClientSidebarComponent } from '../client-sidebar/client-sidebar.component';

@Component({
  selector: 'app-client-dashboard',
  imports: [ClientSidebarComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

}