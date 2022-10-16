import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  pendingRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();
    this.pendingRequests++;

    return next.handle(request)
      .pipe(
        tap({
          next:(event)=>{
            // if request id finished
            if(event.type === HttpEventType.Response){
              this.handleHideloading()
            }
          },
          error:() => {
            this.handleHideloading()
          }
        }))
      }

  handleHideloading(){
    this.pendingRequests--;
    if(this.pendingRequests === 0){
      this.loadingService.hideLoading();
    }
  }

}
