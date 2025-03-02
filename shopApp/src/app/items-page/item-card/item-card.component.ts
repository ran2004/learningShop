import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Item } from '../../types/models/Item';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [MatCardModule, CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
})
export class ItemCardComponent implements OnInit{
  @Input() isAdmin!: boolean;
  @Input() item!: Item;
  @Input() buyItem!: (id: number) => void;
  @Input() addToItem!: (id: number) => void;

  constructor(  
  ) {}

  ngOnInit(): void {
  }

  Buy() {
    this.buyItem(this.item.id);
  }

  Add() {
    this.addToItem(this.item.id);
  }
}
