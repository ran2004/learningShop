import { Routes } from '@angular/router';
import { ItemsPageComponent } from './items-page/items-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { AdminResolver } from './resolvers/admin.resolver';
import { LoginPageComponent } from './login-page/login-page.component';
import { ItemsManagmentPageComponent } from './items-managment-page/items-managment-page.component';
import { UserResolver } from './resolvers/user.resolver';

export const routes: Routes = [
  {
    path: 'items',
    component: ItemsPageComponent,

  },
  {
    path: 'itemsManagment',
    component: ItemsManagmentPageComponent,

  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'users',
    component: UsersPageComponent,

  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
