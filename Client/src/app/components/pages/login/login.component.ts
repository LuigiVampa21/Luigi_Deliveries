import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { UserLogin } from 'src/app/shared/interfaces/user.login.interface';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl= '';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onSubmit(loginForm:UserLogin){
    this.isSubmitted = true;
    this.userService.onLogin(loginForm)
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl)
      })

  }
}

