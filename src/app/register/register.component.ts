import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  onSubmit() {
    this.registrationObject.name.firstName =
      this.loginForm.value.firstName || '';
    this.registrationObject.name.middleName =
      this.loginForm.value.middleName || '';
    this.registrationObject.name.lastName = this.loginForm.value.lastName || '';

    this.registrationObject.address.houseNumber =
      this.loginForm.value.houseNumber || '';
    this.registrationObject.address.street = this.loginForm.value.street || '';
    this.registrationObject.address.city = this.loginForm.value.city || '';
    this.registrationObject.address.zipcode =
      this.loginForm.value.zipcode || '';

    this.registrationObject.email = this.loginForm.value.email || '';
    this.registrationObject.pass = this.loginForm.value.pass || '';
    this.registrationObject.phoneNumber =
      this.loginForm.value.phoneNumber || '';
    this.registrationObject.role = this.loginForm.value.role || '';
    console.log(this.registrationObject);
    this.loginService.register(this.registrationObject);
    this.router.navigate(["login"]);
  }

  registrationObject = {
    name: {
      firstName: '',
      middleName: '',
      lastName: '',
    },
    email: '',
    pass: '',
    phoneNumber: '',
    address: {
      houseNumber: '',
      street: '',
      city: '',
      zipcode: '',
    },
    role: '',
  };

  loginForm = this.formBuilder.group({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    pass: '',
    phoneNumber: '',
    houseNumber: '',
    street: '',
    city: '',
    zipcode: '',
    role: 'USER',
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
}
