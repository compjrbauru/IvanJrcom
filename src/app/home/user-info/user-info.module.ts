import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from './../../@theme-home/theme.module';
import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';

@NgModule({
    imports: [CommonModule, ThemeModule, UserInfoRoutingModule],
    declarations: [UserInfoComponent],
    exports: [UserInfoComponent],
})

export class UserInfoModule { }
