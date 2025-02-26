import { Component } from '@angular/core';
import { Item } from '../types/models/Item';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { ROLE } from '../types/enums/Role';
import {
  Observable,
  Subject,
  debounce,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManagmentItemCardComponent } from './managment-item-card/item-managment-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ItemFormCardComponent } from './item-form-card/item-form-card.component';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items-page',
  imports: [
    ManagmentItemCardComponent,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    ItemFormCardComponent,
  ],
  templateUrl: './items-managment-page.component.html',
  styleUrl: './items-managment-page.component.css',
})
export class ItemsManagmentPageComponent {
  items: Item[] = [];
  filteredItems: Item[] = [];
  isFromOpen: boolean = false;

  searchControl: FormControl = new FormControl(''); // FormControl for search input

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
      this.filteredItems = items;
    });
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(() => {
        this.filterItems();
      });
  }

  startAddingItem(): void {
    this.isFromOpen = true;
  }

  deleteItem(idToDelete: number): void {
    this.itemsService.deleteItem(idToDelete).subscribe(() => {
      const index = this.items.findIndex((item) => item.id === idToDelete);

      if (index !== -1) {
        this.items.splice(index, 1);
        this.filterItems();
      }
    });
  }

  addItem(newItemData: Item): void {
    this.itemsService.saveItem(newItemData).subscribe((newItem) => {
      this.items.push(newItem);
      this.filterItems();
    });
  }

  saveItem(newItemData: Item): void {
    this.itemsService.saveItem(newItemData).subscribe((updatedItem) => {
      const itemIndex = this.items.findIndex(
        (item) => item.id === updatedItem.id
      );
      if (itemIndex !== -1) {
        this.items[itemIndex] = updatedItem;
      }
      this.filterItems();
    });
  }

  filterItems(): void {
    const searchText = this.searchControl.value;

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
