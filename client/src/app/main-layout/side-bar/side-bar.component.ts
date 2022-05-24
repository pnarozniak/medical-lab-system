import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  isResponsive: boolean = true;

  constructor(private router: Router,
    public authService: AuthService) { 

    this.router.events.pipe(filter(event =>
      event instanceof NavigationStart)).subscribe((event) => {
        if (this.isResponsive) {
          this.isResponsive = false;

          setTimeout(() => {
            this.isResponsive = true;
          }, 800)
        }
   });
  }

  ngOnInit(): void {
    
  }
}
