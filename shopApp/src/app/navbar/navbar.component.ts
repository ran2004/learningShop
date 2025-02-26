import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ROLE, Role } from '../types/enums/Role';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userRole: Role | undefined;
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      console.log(event)
      if (event instanceof NavigationEnd ) {
        this.getUserRole();
      }
    });
  }

  getUserRole(): void {
    this.usersService
      .getUserCurrentRole()
      .subscribe({
        next: (response) => {
          this.userRole = response.userRole
        },
        error: (error) => {
          this.userRole = undefined
        }});
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(["login"])
  }
}
