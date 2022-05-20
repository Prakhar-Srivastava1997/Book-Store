import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserServiceService } from '../services/auth-user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGaurdGuard implements CanActivate {

  constructor(private userauth:AuthUserServiceService, private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.userauth.isUserLoggedIn()){
        this.route.navigate(['login']);
        return false;
      }
      return this.userauth.isUserLoggedIn();
    }
  }
  

