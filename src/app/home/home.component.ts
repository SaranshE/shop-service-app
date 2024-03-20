import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { WishlistService } from '../wishlist.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: Product[] | undefined;
  categories: string[] | undefined;
  linksEnabled: boolean = localStorage.getItem('tokenValid') == 'true';
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private router: Router,
    private cartService: CartService
  ) {}

  addToCart(num: number) {
    this.cartService.addToCart(num).subscribe((stuff) => {
      this.router.navigate(['cart']);
    });
  }
  addToWishlist(num: number) {
    this.wishlistService.addToWishlist(num).subscribe((stuff) => {
      this.router.navigate(['wishlist']);
    });
  }

  ngOnInit(): void {
    this.linksEnabled = localStorage.getItem('tokenValid') == 'true';
    this.productService.getAllProducts().subscribe(
      (products) => {
        console.log(products);
        this.data = products;
        for (var product of this.data || []) {
          product.quantity = 1;
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.productService.getCategories().subscribe(
      (categories) =>{
        console.log(categories);
        this.categories = categories;
      },
      (error) =>{
        console.log(error);
      }
    )
  }
}
