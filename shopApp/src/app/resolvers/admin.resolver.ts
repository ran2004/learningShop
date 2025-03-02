import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ROLE } from '../types/enums/Role';
import { UserResolverResult } from './user.resolver';

@Injectable({
  providedIn: 'root',
})
export class AdminResolver implements Resolve<UserResolverResult> {
  constructor(private usersService: UsersService, private router: Router) {}

  resolve(): Observable<UserResolverResult> {
    return new Observable<UserResolverResult>((observer) => {
      this.usersService.getUserCurrentRole().subscribe({
        next: (response) => {
          if (response.userRole === ROLE.User) {
            this.router.navigate(['/items']);
          }
          observer.next(response.userRole);
        },
        error: () => {
          this.router.navigate(['/login']);
          observer.next(undefined);
        },
      });
    });
  }
}
