// src/app/resolvers/admin.resolver.ts

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
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
      this.usersService.getCurrentUser().subscribe((user) => {
        if (user?.role !== ROLE.Admin) {
          if (!user) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/items']);
          }
        }

        observer.next(user);
      });
    });
  }
}
