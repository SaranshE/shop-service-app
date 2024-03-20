import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
    (orders) => {
      console.log(orders);
      this.data = orders;
    },
    (error) => {
      console.log(error);
      localStorage.setItem('tokenValid', 'false');
      localStorage.setItem('role', 'user')
      this.router.navigate(['login']);
    }
    );
  }
  data: Order[] | undefined;

  constructor(private orderService: OrderService, private router: Router){}
}
