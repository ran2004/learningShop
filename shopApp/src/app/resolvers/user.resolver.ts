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

export type UserResolverResult = User | undefined

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserResolverResult> {
  constructor(private usersService: UsersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserResolverResult> {
    return new Observable<UserResolverResult>((observer) => {
      this.usersService.getCurrentUser().subscribe((user) => {
        if (user) {
          this.router.navigate(['/items']);
          observer.next(user);
        } else {
          this.router.navigate(['/login']);
          observer.next(undefined);
        }
      });
    });
  }
}
