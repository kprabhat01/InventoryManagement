import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ChangePasscodeComponent } from './change-password/change-passcode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/search/filter.pipe';
import { ResetCredentialComponent } from './reset-credential/reset-credential.component';
import { CreateUserComponent } from './create-user/create-user.component';
@NgModule({
  declarations: [UserManagementComponent, ChangePasscodeComponent, FilterPipe, ResetCredentialComponent, CreateUserComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UserManagementModule { }
