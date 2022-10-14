import { Food } from "./Food.model";

export class CartItem{
  constructor(public food:Food){ }
  quantity:number = 1 ;
  price: number = this.food.price;
}
