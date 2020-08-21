import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';
import { AuthenticationResponse } from '../models/authentication';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private localStorage: LocalStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.localStorage.getObject<AuthenticationResponse>('AuthenticationResponse')
      .then(p => {
        if (p.Role === 'Super-Admin') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }).catch(err => this.router.navigate(['/login']));
  }

}
