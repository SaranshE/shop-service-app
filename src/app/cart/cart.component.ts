import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  placeOrder() {
    this.orderService.placeOrder().subscribe(
      (stuff) => {
        this.cartService.clearCart().subscribe(
          (stuff) => {
            this.router.navigate(['orders']);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        this.ngOnInit();
      });
  }

  addToCart(num: number) {
    this.cartService.addToCart(num).subscribe((thing) => {
      console.log(thing);
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
      this.ngOnInit();
    });
  }

  constructor(
    private cartService: CartService,
    private router: Router,
    private wishlistService: WishlistService,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.cartService.getCart().subscribe(
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

  data: Product[] | undefined;

  removeFromCart(num: number) {
    this.cartService.removeFromCart(num).subscribe((stuff) => {
      this.ngOnInit();
    },
    (error) => {
      console.log(error);
      this.ngOnInit();
    });
  }

  addToWishlist(num: number) {
    this.wishlistService.addToWishlist(num).subscribe((stuff) => {
      this.router.navigate(['wishlist']);
    });
  }
}
