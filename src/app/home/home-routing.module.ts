import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { ChangePasscodeComponent } from '../User/change-password/change-passcode.component';
import { UserManagementComponent } from '../User/user-management/user-management.component';
import { ResetCredentialComponent } from '../User/reset-credential/reset-credential.component';
import { CreateUserComponent } from '../User/create-user/create-user.component';
import { ItemComponent } from '../inventory-management/item/item.component';
import { InventoryPageModule } from '../inventory-management/inventory.module';
import { AdminAuthGuard } from '../guards/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [{
      path: 'dashboard',
      loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [UserAuthGuard]
    }, {
      path: 'changePassowrd',
      component: ChangePasscodeComponent,
      canActivate: [UserAuthGuard]
    },
    {
      path: 'userManagement',
      component: UserManagementComponent,
      canActivate: [UserAuthGuard, AdminAuthGuard]
    },
    {
      path: 'resetPassword/:id',
      component: ResetCredentialComponent,
      canActivate: [UserAuthGuard, AdminAuthGuard]
    }, {
      path: 'additem',
      loadChildren: () => import('../inventory-management/inventory.module').then(m => InventoryPageModule),
      canActivate: [UserAuthGuard]
    },
    {
      path: 'createuser',
      component: CreateUserComponent,
      canActivate: [UserAuthGuard, AdminAuthGuard]
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
