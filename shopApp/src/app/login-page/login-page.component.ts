import { Component } from '@angular/core';
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
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private _usersService: UsersService, private router: Router) {
    this.loginForm = new FormGroup({
      userId: new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {}

  // Method to handle form submission
  onLogin(): void {
    if (this.loginForm.valid) {
      this._usersService
        .userLogin(this.loginForm.get('userId')?.value)
        .subscribe((response) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/items']);
        });
    }
  }
}
