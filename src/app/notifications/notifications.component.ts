import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';

interface Notification {
  id: number;
  type: 'task' | 'deadline' | 'info' | 'danger' | 'warning';
  title: string;
  message: string;
  time: string;
  category: string;
  isUnread: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [EmployeeSidebarComponent, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: Notification[] = [
    {
      id: 1056,
      type: 'task',
      title: 'New Work Assignment',
      message: '<strong>Task #1056:</strong> Solar Panel Installation - Site A<br><strong>Client:</strong> MegaCorp Energy<br><strong>Location:</strong> Green Valley Complex<br><strong>Priority:</strong> High<br><strong>Deadline:</strong> Oct 22, 2025',
      time: '2 hours ago',
      category: 'New Assignment',
      isUnread: true
    },
    {
      id: 1024,
      type: 'deadline',
      title: 'Deadline Reminder',
      message: '<strong>Task #1024:</strong> Solar Panel Installation<br>Your assignment is due in <strong>2 days</strong>. Current progress: 65%<br>Please ensure timely completion.',
      time: '5 hours ago',
      category: 'Deadline Alert',
      isUnread: true
    },
    {
      id: 1015,
      type: 'info',
      title: 'Task Details Updated',
      message: '<strong>Task #1015:</strong> Industrial Estate<br>Admin has updated the task details and deadline.<br><strong>New Deadline:</strong> Oct 30, 2025',
      time: '1 day ago',
      category: 'Task Update',
      isUnread: false
    },
    {
      id: 1023,
      type: 'danger',
      title: 'Task Overdue',
      message: '<strong>Task #1023:</strong> Tech Park Phase 2<br>This task is now <strong>overdue</strong>. Please provide an update immediately or contact admin.',
      time: '2 days ago',
      category: 'Overdue',
      isUnread: true
    },
    {
      id: 1020,
      type: 'warning',
      title: 'Task Reassigned to You',
      message: '<strong>Task #1020:</strong> Coastal Residences<br>This task has been reassigned to you from another technician.<br><strong>Deadline:</strong> Nov 5, 2025',
      time: '3 days ago',
      category: 'Reassignment',
      isUnread: false
    },
    {
      id: 1012,
      type: 'warning',
      title: 'Priority Changed',
      message: '<strong>Task #1012:</strong> Commercial Building Inspection<br>Priority has been changed from Medium to <strong>High</strong> by Admin.<br>Please prioritize this task.',
      time: '4 days ago',
      category: 'Priority Update',
      isUnread: false
    }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => n.isUnread).length;
  }

  markAsRead(notificationId: number): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.filter(n => !n.isUnread);
  }

  getIconClass(type: string): string {
    const iconMap: { [key: string]: string } = {
      'task': 'fas fa-clipboard-list',
      'deadline': 'fas fa-calendar-alt',
      'info': 'fas fa-info-circle',
      'danger': 'fas fa-exclamation-circle',
      'warning': 'fas fa-exchange-alt'
    };
    return iconMap[type] || 'fas fa-bell';
  }

  getIconColorClass(type: string): string {
    const colorMap: { [key: string]: string } = {
      'task': 'task-icon',
      'deadline': 'deadline-icon',
      'info': 'info-icon',
      'danger': 'danger-icon',
      'warning': 'warning-icon'
    };
    return colorMap[type] || 'info-icon';
  }

  getCategoryClass(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'New Assignment': 'task-category',
      'Deadline Alert': 'deadline-category',
      'Task Update': 'info-category',
      'Overdue': 'danger-category',
      'Reassignment': 'warning-category',
      'Priority Update': 'warning-category'
    };
    return categoryMap[category] || 'info-category';
  }
}