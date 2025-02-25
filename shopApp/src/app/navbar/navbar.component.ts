import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ROLE } from '../types/enums/Role';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .getCurrentUser()
      .subscribe((user) => (this.isAdmin = user.role === ROLE.Admin)); 
  }
}
