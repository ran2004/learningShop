import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Item } from '../../types/models/Item';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
})
export class ItemCardComponent {
  @Input() isAdmin: boolean = false;
  @Input() item!: Item;
  @Input() buyItem!: (id: number) => void;
  @Input() addToItem!: (id: number) => void;

  constructor() {}

  Buy() {
    this.buyItem(this.item.id);
  }

  Add() {
    this.addToItem(this.item.id);
  }
}
