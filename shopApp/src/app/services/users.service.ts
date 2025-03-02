import { Injectable } from '@angular/core';
import { User } from '../types/models/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../app.config';
import { Role } from '../types/enums/Role';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersPath = baseUrl + '/users';

  constructor(private http: HttpClient) {}

  getUserCurrentRole(): Observable<{userRole:Role}> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<{userRole:Role}>(`${this.usersPath}/current/role`, { headers });
  }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<User[]>(this.usersPath, { headers });
  }

  userLogin(userId: number) : Observable<{ token: string }>{
    return this.http.get<{ token: string }>(`${this.usersPath}/login/${userId}`);
  }
}
