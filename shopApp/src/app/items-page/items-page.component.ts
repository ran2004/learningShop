import { Component } from '@angular/core';
import { ItemCardComponent } from './item-card/item-card.component';
import { Item } from '../types/models/Item';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items-page',
  imports: [ItemCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './items-page.component.html',
  styleUrl: './items-page.component.css',
})
export class ItemsPageComponent {
  items: Item[] = [];
  filteredItems: Item[] = [];
  isAdmin: boolean = false;
  searchControl: FormControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
      this.filteredItems = items;
    });
    this.filteredItems = this.items;
    // this.isAdmin = this.route.snapshot.data['user']?.isAdmin === ROLE.Admin;
    this.isAdmin = true;
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(() => {
        this.filterItems();
      });
  }

  filterItems(): void {
    const searchText = this.searchControl.value;

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  buyItem(id: number) {
    this.itemsService.buyItem(id).subscribe((updatedItem) => {
      this.updateItems(updatedItem);

      this.filterItems();
    });
  }

  addToItem(id: number) {
    this.itemsService.addToItem(id).subscribe((updatedItem) => {
      this.updateItems(updatedItem);

      this.filterItems();
    });
  }

  updateItems(updatedItem: Item) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === updatedItem.id
    );
    if (itemIndex !== -1) {
      this.items[itemIndex] = updatedItem;
    }
  }
}
