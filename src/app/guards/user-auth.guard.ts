import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { LocalStorageService } from '../shared/local-storage.service';
import { AuthenticationResponse } from '../models/authentication';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router, private localStorage: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    return this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse')
      .then(p => {
        const tokenDate = new Date(p['.expires']);
        if (p && p.access_token && tokenDate > new Date()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }).catch(err => this.router.navigate(['/login']));
  }
}

