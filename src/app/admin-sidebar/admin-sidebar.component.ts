// admin-sidebar.component.ts (New/Updated - assuming this exists; create if not)
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Added for routerLink

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule],  // Required for routerLink and routerLinkActive
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {}