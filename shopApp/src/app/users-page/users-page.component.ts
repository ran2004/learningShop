import { Component } from '@angular/core';
import { User } from '../types/models/User';
import { UserCardComponent } from './user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { SignalRService } from '../services/signal.service';

@Component({
  selector: 'app-users-page',
  imports: [UserCardComponent, CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {
  users: User[] = [];
  connectedUsersIds: string[] = []; 

  constructor(
    private usersService: UsersService,
    private signalService: SignalRService
  ) {}

  ngOnInit(): void {
    this.connectedUsersIds = this.signalService.recivedUsersIdsList
    this.signalService.onReceiveUserList("UsersPageComponent",(connectedUserIds: string[]) => {
      this.connectedUsersIds = connectedUserIds;
      this.updateUsersActivityStatus();
    });

    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.updateUsersActivityStatus();
    });
  }

  private updateUsersActivityStatus(): void {
    this.users.forEach((user) => {
      user.isActive = this.connectedUsersIds.includes(user.id.toString()); 
    });
  }
}
