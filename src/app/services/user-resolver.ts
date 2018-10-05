import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class UserResolverService implements Resolve<Observable<any>> {

  constructor(private authService: AuthService) { }

  resolve() {
    return this.authService.getResolvedUser();
  }
}
