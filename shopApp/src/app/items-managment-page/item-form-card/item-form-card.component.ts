import {
  Component,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Item } from '../../types/models/Item';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-item-form-card',
  imports: [
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './item-form-card.component.html',
  styleUrl: './item-form-card.component.css',
})
export class ItemFormCardComponent {
  @Input() item: Item | undefined;
  @Input() onSave: (() => void) | undefined;
  @Input() onCancel: (() => void) | undefined;
  @Input() isFromOpen!: boolean;
  @Output() isFromOpenChange  = new EventEmitter<boolean>();
  itemForm: FormGroup;

  constructor(
    private itemService: ItemsService
  ) {
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

  Delete() {
    if (this.item) this.itemService.delete(this.item.id);
    this.isFromOpenChange.emit(!this.isFromOpen);
  }

  Cancel() {
    if (this.onCancel) this.onCancel();
    this.isFromOpenChange.emit(!this.isFromOpen);
  }

  saveItem() {
    const updatedItem: Item = {
      ...this.item,
      ...this.itemForm.value,
    };

    this.isFromOpenChange.emit(!this.isFromOpen);
  }
}
