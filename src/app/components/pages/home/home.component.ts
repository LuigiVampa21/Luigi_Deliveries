import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food.model';


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
    this.foods = this.foodService.getAllFoods()
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
  this.foods = this.foodService.getFoodsBySearchTerms(this.searchTerm)
 }
 sendSearchByTag(){
  this.foods = this.foodService.getFoodByTags(this.tag)
 }
}
