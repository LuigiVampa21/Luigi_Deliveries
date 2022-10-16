import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss']
})
export class OrderItemsListComponent implements OnInit {

  @Input() order!:Order

  constructor() { }

  ngOnInit(): void {
  }

}
