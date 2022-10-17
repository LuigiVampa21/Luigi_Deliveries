import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit {

  @Input()order!:Order

  constructor() { }

  ngOnInit(): void {
  }

}
