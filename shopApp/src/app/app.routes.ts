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
    resolve: {
      items: UserResolver, // Associate the resolver with the route
    },
  },
  {
    path: 'itemsManagment',
    component: ItemsManagmentPageComponent,
    resolve: {
      items: AdminResolver, // Associate the resolver with the route
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
      items: AdminResolver, // Associate the resolver with the route
    },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
