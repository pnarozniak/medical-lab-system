import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './api.service'
import { JwtInterceptor } from './jwt-interceptor.service';
import { AuthService } from '../auth/auth.service';
import { UnauthorizedInterceptor } from './unauthorized-interceptor.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ApiService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (aS: AuthService) => () => aS.validateAuthState(),
            deps: [AuthService],
            multi: true
        }
    ]
})
export class CoreModule {   }