import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../types/models/Item';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemFormCardComponent } from "../item-form-card/item-form-card.component";

@Component({
  selector: 'app-item-managment-card',
  imports: [
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ItemFormCardComponent
],
  templateUrl: './item-managment-card.component.html',
  styleUrl: './item-managment-card.component.css',
})
export class ManagmentItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Input() deleteItemInDB!: (id:number)=>void
  @Input() saveItemInDB!: (updatedItem:Item)=>void

  isFromOpen: boolean = false;

  constructor() {
  
  }

  ngOnInit(): void {
  }

  toggleEditMode() {
    this.isFromOpen = !this.isFromOpen;
  }

  deleteItem(){
    this.deleteItemInDB(this.item.id)
  }

  saveItem(updatedItemData:Item) {
    this.saveItemInDB(updatedItemData)
  }
}
