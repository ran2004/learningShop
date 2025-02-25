import { Routes } from '@angular/router';
import { ItemsPageComponent } from './items-page/items-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { AdminResolver } from './resolvers/admin.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { ItemsManagmentPageComponent } from './items-managment-page/items-managment-page.component';

export const routes: Routes = [
  {
    path: 'items',
    component: ItemsPageComponent,
  },
  {
    path: 'itemsManagment',
    component: ItemsManagmentPageComponent,
    resolve: {
      isAdmin: AdminResolver,
    },
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'users',
    component: UsersPageComponent,
    resolve: {
      isAdmin: AdminResolver,
    },
  },
  { path: '', redirectTo: '/items', pathMatch: 'full' },
];
