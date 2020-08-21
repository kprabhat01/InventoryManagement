import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../api/authentication.service';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../shared/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private storage: LocalStorageService) { }
  version = environment.version;
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.storage.clear();
  }

  onFormSubmission() {
    if (!this.loginForm.invalid) {
      this.authService.authenticateUser(this.loginForm.value);
    }
  }
}
