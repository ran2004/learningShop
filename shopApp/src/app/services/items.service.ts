import { Injectable } from '@angular/core';
import { Item } from '../types/models/Item';
import { baseUrl } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsPath = baseUrl + '/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Item[]>(this.itemsPath, { headers });
  }

  addToItem(id: number): Observable<Item> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<Item>(
      `${this.itemsPath}/add/${id}`,
      {},
      { headers }
    );
  }

  buyItem(id: number): Observable<Item> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<Item>(`${this.itemsPath}/buy/${id}`, {}, { headers });
  }

  deleteItem(id: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<void>(`${this.itemsPath}/${id}`, { headers });
  }

  saveItem(item: Item) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Item>(`${this.itemsPath}`, item, { headers });
  }
}
