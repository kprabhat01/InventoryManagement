import { Component, OnInit } from '@angular/core';
import { Normalize } from 'src/app/models/normalize';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationResponse } from 'src/app/models/authentication';
import { UserManagerService } from 'src/app/api/user-manager.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  roles: Normalize;
  stores: Normalize;
  loggedInUser: string;
  constructor(
    private localStore: LocalStorageService,
    private formBuilder: FormBuilder,
    private userService: UserManagerService
  ) { }

  createUser = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userId: ['', Validators.required],
    passcode: ['', Validators.required],
    outlet: [{}, Validators.required],
    roleId: ['', Validators.required],
    createdBy: ['', Validators.required]
  });


  ngOnInit() {
    this.localStore.getObject<Normalize>('Outlets').then(p => {
      this.stores = p;
    });
    this.localStore.getObject<Normalize>('Roles').then(p => {
      this.roles = p;
    });
    this.localStore.getObject<AuthenticationResponse>('AuthenticationResponse').then(p => { 
      this.createUser.patchValue({ createdBy: p.UserName });
    });
  }

  onFormSubmission() {
    this.userService.createNewUser(this.createUser.value);
  }

}
