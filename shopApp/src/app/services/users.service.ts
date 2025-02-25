import { Injectable } from '@angular/core';
import { User } from '../types/models/User';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private itemsPath = baseUrl + '/items';

  constructor(private http: HttpClient) {}

  get() {}

  getCurrentUser(): Observable<User> {
    return of({ name: 'r', role: 'Admin', id: 1 });
  }
}
