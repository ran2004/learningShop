import { Injectable } from '@angular/core';
import { Item } from '../types/models/Item';
import { baseUrl } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsPath = baseUrl+'/items'

  constructor(private http: HttpClient) {}

  get(){}

  add(id: number) {
    throw new Error('Method not implemented.');
  }

  buy(id: number) {
    throw new Error('Method not implemented.');
  }

  delete(id: number) {
    throw new Error('Method not implemented.');
  }

  save(item: Item) {
    throw new Error('Method not implemented.');
  }
}
