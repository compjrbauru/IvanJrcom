import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserResolverService } from './../../services/user-resolver.service';
import { UserInfoComponent } from './user-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserInfoComponent,
    resolve: { userInfo: UserResolverService },
  },
  {
    path: 'editar',
    loadChildren: './user-edit/user-edit.module#UserEditModule',
    resolve: { userInfo: UserResolverService },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    UserResolverService,
  ],
})
export class UserInfoRoutingModule { }
