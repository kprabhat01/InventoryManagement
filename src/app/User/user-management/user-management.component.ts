import { Component, OnInit } from '@angular/core';
import { UserManagerService } from 'src/app/api/user-manager.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AlertConfirmationService } from 'src/app/shared/alert-confirmation.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {

  constructor(
    private userService: UserManagerService,
    private route: Router,
    private alert: AlertConfirmationService
  ) { }
  users: User;
  getUsers() {
    this.userService.getUers().subscribe(p => {
      this.users = p;
    }, err => {
      this.users = null;
    });
  }
  ngOnInit() {
    this.getUsers();
  }
  resetCredential(id: number) {
    this.route.navigate(['/home/resetPassword/' + id]);
  }
  moveToCreateUser() {
    this.route.navigate(['/home/createuser']);
  }



  deleteUser(id: number) {
    this.alert.presentAlert('Do you want to delete the user').then(res => {
      if (res === 'ok') {
        if (id > 0) {
          this.userService.deleteUser(id).subscribe(p => {
            if (p) {
              this.getUsers();
            }
          });
        }
      }
    });
  }
}
