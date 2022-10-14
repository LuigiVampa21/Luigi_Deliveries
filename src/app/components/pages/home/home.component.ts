import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.initFood();
  }

  initFood(){
    this.foods = this.foodService.getAllFoods()
  }
}
