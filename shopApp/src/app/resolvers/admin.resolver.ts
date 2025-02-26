// src/app/resolvers/admin.resolver.ts

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ROLE } from '../types/enums/Role';
import { User } from '../types/models/User';
import { UserResolverResult } from './user.resolver';

@Injectable({
  providedIn: 'root',
})
export class AdminResolver implements Resolve<UserResolverResult> {
  constructor(private usersService: UsersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserResolverResult> {
    return new Observable<UserResolverResult>((observer) => {
      this.usersService.getUserCurrentRole().subscribe({
        next: (response) => {
          if (response.userRole === ROLE.User) {
            this.router.navigate(['/items']);
          }
          observer.next(response.userRole);
        },
        error: (error) => {
          this.router.navigate(['/login']);
          observer.next(undefined);
        },
      });
    });
  }
}
