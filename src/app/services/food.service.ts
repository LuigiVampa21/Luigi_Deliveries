import { Injectable } from '@angular/core';
import { sample_foods } from 'src/mock/mock-data';
import { Food } from '../shared/models/food.model';
import { Tag } from '../shared/models/tag.model';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAllFoods():Food[]{
    return sample_foods
  }

  getFoodsBySearchTerms(searchTerms:string){
    return this.getAllFoods().filter(f => f.name.toLowerCase().includes(searchTerms.toLowerCase()))
  }
}
