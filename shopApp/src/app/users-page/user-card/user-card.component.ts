import { Component, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../../types/models/User';

@Component({
  selector: 'app-user-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: User;
}
