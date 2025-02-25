import { Component, Input } from '@angular/core';
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
  @Input() item!: Item;
  @Input() isAdmin: boolean = false;

constructor(private itemService:ItemsService){}

  Buy(){
this.itemService.buy(this.item.id)
  }

  Add(){
    this.itemService.add(this.item.id)
      }
}
