import { Injectable } from '@angular/core';
import { Item } from '../types/models/Item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor() {}

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
