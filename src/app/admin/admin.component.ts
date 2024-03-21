import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { User } from '../user';
import { AdminService } from '../admin.service';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  editUserClick(arg0: User) {
    this.userToEdit = Object.assign({}, arg0);
    this.editUserBool = true;
  }

  editUser() {
    this.adminService.editUser(this.userToEdit).subscribe((thing) => {
      console.log(thing);
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
      this.ngOnInit();
    });
  }
  editProductClick(arg0: Product) {
    this.productToEdit = Object.assign({}, arg0);
    this.edit = true;
  }
  editProduct() {
    this.adminService.editProduct(this.productToEdit).subscribe(
      (thing) => {
        console.log(thing);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.ngOnInit();
      }
    );
  }
  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(
      (thing) => {
        console.log(thing);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.ngOnInit();
      }
    );
  }
  addProduct() {
    this.adminService.addProduct(this.productForm.value).subscribe((thing) => {
      console.log(thing);
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
      this.ngOnInit();
    });
  }
  productForm = this.formBuilder.group({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl:''
  });
  productToEdit: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    quantity: 0,
    imageUrl: ''
  };
  userForm = this.formBuilder.group({
    name: {
      firstName: '',
      middleName: '',
      lastName: '',
    },
    email: '',
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: '',
    },
    phoneNumber: '',
    role: '',
  });

  userToEdit: User = {
    id: 0,
    name: {
      firstName: '',
      middleName: '',
      lastName: '',
    },
    email: '',
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: '',
    },
    phoneNumber: '',
    role: '',
  };

  edit: boolean = false;
  editUserBool: boolean = false;
  delete(id: number) {
    this.adminService.deleteProduct(id).subscribe((thing) => {
      console.log(thing);
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    this.productForm.reset();
    this.editUserBool = false;
    this.edit = false;
    this.adminService.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.userData = data;
        this.productService.getAllProducts().subscribe(
          (data) => {
            console.log(data);
            this.productData = data;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        localStorage.setItem('tokenValid', 'false');
        localStorage.setItem('role', 'user')
        this.router.navigate(['login']);
      }
    );
  }

  productData: Product[] | undefined;
  userData: User[] | undefined;
  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}
}
