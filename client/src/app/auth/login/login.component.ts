import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from '../../core/email-validator.directive'
import { passwordValidator } from '../../core/password-validator.directive'
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fg!: FormGroup

  constructor(private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    activatedRoute: ActivatedRoute,
    private translate: TranslateService) {

      if(activatedRoute.snapshot.paramMap.get('sessionExpired'))
        toastrService.error(this.translate.instant('ALERTS.ERROR.SESSION_EXPIRED'))
      
      if (activatedRoute.snapshot.paramMap.get('loginRequired'))
        toastrService.error(this.translate.instant('ALERTS.ERROR.LOGIN_REQUIRED'))
    }

  ngOnInit(): void {
    this.fg = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.minLength(3), Validators.maxLength(60), emailValidator()
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(32), passwordValidator()
      ]),
      summary: new FormControl()
    })
  }

  get email() {return this.fg.get('email')}
  get password() {return this.fg.get('password')}
  get summary() { return this.fg.get('summary')}

  onSubmit() : void {

    if (this.summary?.errors) {
      this.email?.setErrors(null)
      this.password?.setErrors(null)
      this.email?.updateValueAndValidity()
      this.password?.updateValueAndValidity()
    }

    if ((this.email?.invalid || this.password?.invalid)) {
        return
    }
    
    this.authService.login(this.email!.value, this.password!.value)
      .subscribe({
        next: _ => {
          this.toastrService.success(this.translate.instant('ALERTS.SUCCESS.LOGIN'))
          this.router.navigate([''])
        },
        error: _ => {
          this.email?.setErrors({wrongCredentials: ' '})
          this.password?.setErrors({wrongCredentials: ' '})
          this.summary?.setErrors({wrongCredentials: ' '})
        }
      })
  }
}
