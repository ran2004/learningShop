import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Item } from '../../types/models/Item';
import { ItemsService } from '../../services/items.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
  isFromOpen: boolean = false; // To toggle between edit and view mode
  itemForm: FormGroup;

  constructor(private itemService: ItemsService,private cdr: ChangeDetectorRef) {
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.itemForm.setValue({
        name: this.item.name,
        price: this.item.price,
      });
    }
  }

  toggleEditMode() {
    console.log(this.isFromOpen)
    this.isFromOpen = !this.isFromOpen;
    this.cdr.detectChanges(); 
  }

  deleteItem() {
    this.itemService.delete(this.item.id);
  }

  saveItem() {
    const updatedItem: Item = {
      ...this.item,
      ...this.itemForm.value,
    };
    this.toggleEditMode();
  }
}
