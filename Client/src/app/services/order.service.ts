import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL_CREATE_ORDER = environment.ORDER_CREATE;
  URL_GET_ORDER = environment.ORDER_GET;

  constructor(private http:HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(this.URL_CREATE_ORDER, order)
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(this.URL_GET_ORDER)
  }

}
