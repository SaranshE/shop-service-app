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
        console.log(stuff);
        this.cartService.clearCart().subscribe(
          (stuff) => {
            console.log(stuff);
            this.router.navigate(['orders']);
          },
          (error) => {
            console.log(error);
            console.log("Error in ClearCart");
            this.ngOnInit();
          }
        );
      },
      (error) => {
        console.log(error);
        console.log("Error in PlaceOrder");
        this.ngOnInit();
      }
    );
  }

  addToCart(num: number) {
    this.cartService.addToCart(num).subscribe(
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
        this.total = 0;
        for(var val of this.data || [])
        {
          this.total = this.total + (val.price * val.quantity);
        }
      },
      (error: any) => {
        console.log(error);
        localStorage.setItem('tokenValid', 'false');
        localStorage.setItem('role', 'user');
        this.router.navigate(['login']);
      }
    );
  }

  data: Product[] | undefined;
  total: number = 0;
  removeFromCart(num: number) {
    this.cartService.removeFromCart(num).subscribe(
      (stuff) => {
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.ngOnInit();
      }
    );
  }

  addToWishlist(num: number) {
    this.wishlistService.addToWishlist(num).subscribe((stuff) => {
      this.router.navigate(['wishlist']);
    });
  }
}
