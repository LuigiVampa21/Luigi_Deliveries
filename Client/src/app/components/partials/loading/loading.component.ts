import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  isLoading!:boolean;

  constructor(private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading
      .subscribe(loader => {
        this.isLoading = loader
      })

    // this.loadingService.showLoading()
  }

}
