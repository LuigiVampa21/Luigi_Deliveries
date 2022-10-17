import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/User.model';
import { UserRegister } from '../shared/interfaces/user.register.interface';
import { UserLogin } from '../shared/interfaces/user.login.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_USERS_LOGIN = environment.USERS_LOGIN_URL;
  API_USERS_REGISTER = environment.USERS_REGISTER_URL;

  USER_KEY = environment.USER_KEY;

  userSub$: BehaviorSubject<User> = new BehaviorSubject(this.getUserFromLocalStorage());
  userObs$!:Observable<User>;

  constructor( private http: HttpClient, private toastrService: ToastrService) {
    this.userObs$ = this.userSub$.asObservable()
   }

  getCurrentUser() :User{
    return this.userSub$.value;
  }

  onLogin(userData:UserLogin){
    return this.http.post<User>(this.API_USERS_LOGIN, userData)
        .pipe(
          tap(
            {
            next:(user:User) => {
              this.setUserToLocalStorage(user)
              this.userSub$.next(user);
              this.toastrService.success(
                `Congrats ${user.name} you logged In Successfully !`
              )
            },
            error:(errorResponse) => {
              this.toastrService.error(
                errorResponse.error,
                `Login Failed`
              )
            }
          }
        )
 ) }

  onRegister(userData:UserRegister){
    return this.http.post<User>(this.API_USERS_REGISTER, userData)
    .pipe(
      tap(
        {
        next:(user:User) => {
          this.setUserToLocalStorage(user)
          this.userSub$.next(user);
          this.toastrService.success(
            `Congrats ${user.name} you registered Successfully !`
          )
        },
        error:(errorResponse) => {
          this.toastrService.error(
            errorResponse.error,
            `Registration Failed`
          )
        }
      }
    )
)
  }

  onLogout(){
    this.userSub$.next(new User());
    localStorage.removeItem(this.USER_KEY);
    window.location.reload()
  }

 private setUserToLocalStorage(user:User){
  localStorage.setItem(this.USER_KEY, JSON.stringify(user))
 }

 private getUserFromLocalStorage():User{
  const userJson = localStorage.getItem(this.USER_KEY);
  if(!userJson) return new User();
  return JSON.parse(userJson)
 }
}
