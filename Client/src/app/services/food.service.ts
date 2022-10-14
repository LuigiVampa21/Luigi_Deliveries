import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { sample_foods, sample_tags } from 'src/mock/mock-data';
import { Food } from '../shared/models/Food.model';
import { Tag } from '../shared/models/Tag.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FoodService {
  API_URL = environment.FOODS_URL
  SEARCH_URL = environment.FOODS_SEARCH_URL
  FOODS_BY_TAGS_URL = environment.FOODS_BY_TAGS_URL
  FOODS_BY_ID = environment.FOODS_BY_ID

  constructor(private http: HttpClient) { }

  getAllFoods():Observable<Food[]>{
    return this.http.get<Food[]>(this.API_URL)
  }

  getFoodsBySearchTerms(searchTerms:string){
    return this.http.get<Food[]>(this.SEARCH_URL + searchTerms)
  }

  getAllTags():Tag[]{
    return sample_tags;
  }

  getFoodByTags(tag:string):Observable<Food[]>{
    if(tag === 'All') return this.getAllFoods();
    return this.http.get<Food[]>(this.FOODS_BY_TAGS_URL + tag)
  }

  getFoodByID(foodID:string):Observable<Food[]>{
    return this.http.get<Food[]>(this.FOODS_BY_ID + foodID)

  }
}
