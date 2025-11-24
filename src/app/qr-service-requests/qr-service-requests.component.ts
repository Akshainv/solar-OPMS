import { Component } from '@angular/core';
import { ClientSidebarComponent } from '../client-sidebar/client-sidebar.component';

@Component({
  selector: 'app-qr-service-requests',
  standalone: true,
  imports: [ClientSidebarComponent],
  templateUrl: './qr-service-requests.component.html',
  styleUrl: './qr-service-requests.component.css'
})
export class QrServiceRequestsComponent {

}
