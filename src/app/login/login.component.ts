import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  onSubmit() {
    this.loginService
      .login(
        this.loginForm.value.email || '',
        this.loginForm.value.password || ''
      )
      .subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('token', data);
          localStorage.setItem('tokenValid', 'true');
          this.loginService.getId(data).subscribe(
            (data: string) => {
              console.log(data);
              localStorage.setItem('userId', data);
              this.loginService.getRole().subscribe(
                (data) => {
                  console.log(data);
                  localStorage.setItem('role', data);
                  this.router.navigate(['home']);
                },
                (error) => {
                  console.log(error);
                }
              );

            },
            (error: any) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}
  ngOnInit(): void {
    console.log('Login Init');
    this.loginService.logout().subscribe(
      (data: any) => {
        console.log(data);
        localStorage.clear();
      },
      (error: any) => {
        console.log(error);
        localStorage.clear();
      }
    );
  }
}
