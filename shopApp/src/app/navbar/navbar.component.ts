import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { ROLE, Role } from '../types/enums/Role';
import signalR from '@microsoft/signalr';
import { SignalRService } from '../services/signal.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userRole: Role | undefined;
  constructor(private usersService: UsersService, private router: Router,private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getUserRole();
        if (localStorage.getItem('authToken')) {
          this.signalRService.updateToken()
        }
      }
    });
    // this.signalRService.startConnection()
  }

  getUserRole(): void {
    this.usersService.getUserCurrentRole().subscribe({
      next: (response) => {
        this.userRole = response.userRole;
      },
      error: (error) => {
        this.userRole = undefined;
      },
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }
}
