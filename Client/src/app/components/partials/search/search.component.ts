import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  tag!:string;

  constructor(private foodService: FoodService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getSearchterms();
  }

  getSearchterms(){
    this.route.params
    .subscribe((params: Params)=>{
      if(!params['searchTerm'] && !params['tag']) return;
      this.searchTerm = params['searchTerm'];
      this.tag = params['tag'];
    })
  }

  initSearch(s:string){
    this.router.navigateByUrl('/search/' + s)
  }

}
