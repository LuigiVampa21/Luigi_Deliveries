import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods:Food[] = [];
  searchTerm = '';
  tag!:string;

  constructor(private foodService: FoodService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSearchTerms()
  }

  initFood(){
    this.foodService.getAllFoods()
        .subscribe( (food:Food[]) =>
          this.foods = food
    )
  }

  getSearchTerms(){
    this.route.params
      .subscribe((params: Params)=>{
        if(!params['searchTerm'] && !params['tag']) this.initFood();
        if(params['searchTerm']){
          this.searchTerm = params['searchTerm']
          this.sendSearchTerms()
        }
        if(params['tag']){
          this.tag = params['tag'];
          this.sendSearchByTag()
        }
  })
 }
 sendSearchTerms(){
  this.foodService.getFoodsBySearchTerms(this.searchTerm)
      .subscribe( (food:Food[]) => {
        this.foods = food
      })
 }
 sendSearchByTag(){
  this.foodService.getFoodByTags(this.tag)
      .subscribe( (food:Food[]) => {
        this.foods = food
      })
 }
}
