import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  test() {
    localStorage.setItem('tokenValid', 'false');
    localStorage.setItem('role', 'user')
    this.router.navigate(['login']);
  }
  linksDisabled: boolean = localStorage.getItem('tokenValid') == 'true';
  isAdmin: boolean = localStorage.getItem('role') == 'ADMIN';
  navClass: String = this.linksDisabled
    ? 'nav-link disabled'
    : 'nav-link active';
  adminClass: String = this.isAdmin ? 'hidden' : '';

  constructor(private loginService: LoginService, private router: Router) {
    this.router.events.subscribe((route) => {
      console.log(localStorage.getItem('tokenValid') == 'true');
      this.linksDisabled = !(localStorage.getItem('tokenValid') == 'true');
      this.isAdmin = localStorage.getItem('role') == 'ADMIN';
      this.navClass = this.linksDisabled
        ? 'nav-link disabled'
        : 'nav-link active';
      this.adminClass = this.isAdmin ? 'hidden' : '';
    });
  }
}
