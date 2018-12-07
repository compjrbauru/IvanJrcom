import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class UserResolverService implements Resolve<Observable<any>> {

  constructor(private authService: AuthService) { }

  resolve() {
    return this.authService.getResolvedUser();
  }
}
