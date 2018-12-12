import { NgModule } from '@angular/core';

import { UserCompraComponent } from './user-compra.component';
import { UserCompraRoutingModule } from './user-compra.routing.module';
import { ThemeModule } from '../../../@theme-home/theme.module';
import { CommonModule } from '@angular/common';
import { InvitePageModule } from '../../../@core/components/invite-page/invite-page.module';
import { UploadFileModule } from '../../../@core/components/upload-file/upload-file.module';

const USERCOMPRA_COMPONENTS = [UserCompraComponent];

@NgModule({
    imports: [UserCompraRoutingModule, ThemeModule, CommonModule, InvitePageModule, UploadFileModule],
    exports: [...USERCOMPRA_COMPONENTS],
    declarations: [UserCompraComponent],
    providers: [],
})
export class UserCompraModule { }
