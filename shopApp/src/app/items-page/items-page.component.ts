import { Component } from '@angular/core';
import { ItemCardComponent } from './item-card/item-card.component';
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
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-items-page',
  imports: [ItemCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './items-page.component.html',
  styleUrl: './items-page.component.css',
})
export class ItemsPageComponent {
  items: Item[] = [{ id: 1, price: 2, amount: 3, name: 'test' }];
  filteredItems: Item[] = [];
  isAdmin: boolean = false;
  searchControl: FormControl = new FormControl(''); // FormControl for search input

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.filteredItems = this.items;
    this.usersService
      .getCurrentUser()
      .subscribe((user) => (this.isAdmin = user.role === ROLE.Admin));

    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(() => {
        this.filterItems();
      });
  }

  filterItems(): void {
    const searchText = this.searchControl.value; // Get value from FormControl

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
