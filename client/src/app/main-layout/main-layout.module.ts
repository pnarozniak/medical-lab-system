import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        SideBarComponent,
        TopBarComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        SideBarComponent,
        TopBarComponent
    ]
})
export class MainLayoutModule {

}