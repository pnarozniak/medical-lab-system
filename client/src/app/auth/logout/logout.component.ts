import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private router: Router) {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.router.navigate(['/auth/login'])
    this.toastrService.success(
      this.translate.instant("ALERTS.SUCCESS.LOGGED_OUT")
    )
    this.authService.logout()
  }
}
