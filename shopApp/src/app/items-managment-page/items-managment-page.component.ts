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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagmentItemCardComponent } from './managment-item-card/item-managment-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-items-page',
  imports: [ManagmentItemCardComponent, CommonModule, ReactiveFormsModule,MatCardModule,MatIconModule ],
  templateUrl: './items-managment-page.component.html',
  styleUrl: './items-managment-page.component.css',
})
export class ItemsManagmentPageComponent {
  items: Item[] = [{ id: 1, price: 2, amount: 3, name: 'test' }];
  filteredItems: Item[] = [];
  isAddingItem: boolean = false;

  searchControl: FormControl = new FormControl(''); // FormControl for search input
  newItemForm: FormGroup;

  constructor(private usersService: UsersService) {
    this.newItemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {
    this.filteredItems = this.items;

    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe(() => {
        this.filterItems();
      });
  }

  startAddingItem(): void {
    this.isAddingItem = true;
  }

  // Cancel adding an item and reset the form
  cancelAddingItem(): void {
    this.isAddingItem = false;
    this.newItemForm.reset();
  }

  // Save the new item (you can send it to an API or add it to a local list)
  saveItem(): void {
    if (this.newItemForm.valid) {
      // Here, you would typically send the form data to the backend
      console.log('New item:', this.newItemForm.value);
      
      // After saving, reset and hide the form
      this.isAddingItem = false;
      this.newItemForm.reset();
    }
  }

  filterItems(): void {
    const searchText = this.searchControl.value; // Get value from FormControl

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
