// src/app/resolvers/admin.resolver.ts

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ROLE } from '../types/enums/Role';

@Injectable({
  providedIn: 'root'
})
export class AdminResolver implements Resolve<boolean> {

  constructor(private usersService: UsersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.usersService.getCurrentUser().subscribe(user => {
        if (user && user?.role===ROLE.Admin) {
          observer.next(true);
        } else {
          // Redirect to login or some other page if the user is not an admin
          this.router.navigate(['/items']);
          observer.next(false);
        }
      });
    });
  }
}
