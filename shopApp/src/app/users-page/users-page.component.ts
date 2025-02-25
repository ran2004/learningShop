import { Component } from '@angular/core';
import { User } from '../types/models/User';
import { UserCardComponent } from './user-card/user-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [UserCardComponent, CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {
  users: User[] = [{ id: 1,   name: 'test',role:'Admin' }];

  constructor() {}

  ngOnInit(): void {

  }
}
