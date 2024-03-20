import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  data: Product[] | undefined;
  constructor(
    private wishlistService: WishlistService,
    private router: Router,
    private cartService: CartService
  ) {}


  addToCart(num: number) {
    this.cartService.addToCart(num).subscribe((stuff) => {
      this.router.navigate(['cart']);
    });
  }

  removeFromWishlist(num: number) {
    console.log('Delete' + num + ' from wishlist');
    this.wishlistService.removeFromWishlist(num).subscribe((stuff) => {
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(
      (products) => {
        console.log(products);
        this.data = products;
      },
      (error: any) => {
        console.log(error);
        localStorage.setItem('tokenValid', 'false');
        localStorage.setItem('role', 'user')
        this.router.navigate(['login']);
      }
    );
  }
}
