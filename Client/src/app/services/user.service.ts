import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/user.model';
import { UserLogin } from '../shared/interfaces/user.login.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_USERS_LOGIN = environment.USERS_LOGIN_URL;
  API_USERS_REGISTER = environment.USERS_REGISTER_URL;

  userSub$: BehaviorSubject<User> = new BehaviorSubject(new User());
  userObs$!:Observable<User>;

  constructor( private http: HttpClient, private toastrService: ToastrService) {
    this.userObs$ = this.userSub$.asObservable()
   }

  onLogin(userData:UserLogin){
    this.http.post<User>(this.API_USERS_LOGIN, userData)
        .pipe(
          tap({
            next:(user:User) => {
              this.userSub$.next(user);
              this.toastrService.success(
                `Congrats ${user.name} you logged In Successfully !`
              )
            },
            error:(errorResponse) => {

            }
          }
        )
 ) }
}
