import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  canActivate(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
