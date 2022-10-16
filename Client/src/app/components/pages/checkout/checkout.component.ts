import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/Cart.model';
import { Order } from 'src/app/shared/models/order.model'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart!: Cart;
  order: Order = new Order();
  checkoutForm!: FormGroup

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private userService: UserService, private toastRService: ToastrService ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart()
    this.order.items = this.cart.items;
    this.order.totalPrice = this.cart.totalPrice;
    const { name, address } = this.userService.getCurrentUser();

    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastRService.warning('Please fill the inputs', 'Invalid Inputs');
      return
    };
    this.order.name = this.checkoutForm.controls['name'].value;
    this.order.address = this.checkoutForm.controls['address'].value;
  }


}
