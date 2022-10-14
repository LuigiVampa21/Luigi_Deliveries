import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags?:Tag[];

  constructor(private foodService:FoodService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.initTags()
  }

  initTags(){
    this.tags = this.foodService.getAllTags()
  }
}
