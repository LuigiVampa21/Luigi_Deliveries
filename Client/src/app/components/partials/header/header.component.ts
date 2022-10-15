import { Component, OnInit } from '@angular/core';
import { string } from 'joi';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: User;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userObs$
      .subscribe(
        (data:any) => {
          this.user = data.user;
        })
  }

  onLogout(){
    this.userService.onLogout()
  }

}
