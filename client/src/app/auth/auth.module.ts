import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
    ],
    imports: [
        AuthRoutingModule,
        CommonModule,
        SharedModule
    ]
})
export class AuthModule {   }