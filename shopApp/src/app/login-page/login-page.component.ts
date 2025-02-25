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

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule,
    MatButtonModule,          
    MatInputModule,           
    MatFormFieldModule    ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required), 
    });
  }

  ngOnInit(): void {}

  // Method to handle form submission
  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Logged in with username:', this.loginForm.value.username);
    }
  }
}
