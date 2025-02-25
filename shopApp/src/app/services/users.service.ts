import { Injectable } from '@angular/core';
import { User } from '../types/models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getCurrentUser(): Observable<User> {
    return of({ name: 'r', role: 'Admin', id: 1 });
  }
}
