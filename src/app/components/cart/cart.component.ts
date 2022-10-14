import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart.model';
import { CartItem } from 'src/app/shared/models/CartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart!:Cart;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.initCard()
  }

  initCard(){
    this.cartService.getCartObservable()
        .subscribe( c => {
          this.cart = c;
          console.log(this.cart);
        })
  }

  changeQuantity(cart:CartItem, quantity:number|string){
    this.cartService.changeQuantity(cart.food.id, +quantity)

  }
  removeFromCart(cart:CartItem){
    this.cartService.removeFromCart(cart.food.id)

  }

}
