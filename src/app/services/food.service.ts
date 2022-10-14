import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/mock/mock-data';
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

  getAllTags():Tag[]{
    return sample_tags;
  }

  getFoodByTags(tag:string):Food[]{
    if(tag === 'All') return this.getAllFoods();
    return this.getAllFoods().filter(f => f.tags?.includes(tag));
  }
}
