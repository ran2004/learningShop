// src/app/resolvers/admin.resolver.ts

import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Role } from '../types/enums/Role';

export type UserResolverResult = Role | undefined;

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserResolverResult> {
  constructor(private usersService: UsersService, private router: Router) {}

  resolve(): Observable<UserResolverResult> {
    return new Observable<UserResolverResult>((observer) => {
      this.usersService.getUserCurrentRole().subscribe({
        next: (response) => {
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
