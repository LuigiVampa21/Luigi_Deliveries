import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  food!:Food | undefined;
  foodID!:string;
  constructor(private foodService: FoodService, private route: ActivatedRoute, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getFoodID()
  }

  getFoodID(){
    this.route.params
    .subscribe((params: Params)=>{
      if(!params['foodID']) return;
      this.foodID = params['foodID']
      this.getFoodItem()
      console.log(this.food)

    })
  }

  getFoodItem(){
    this.food = this.foodService.getFoodByID(this.foodID)
  }

  addToCart(){
    if(!this.food) return;
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart')
  }

}
