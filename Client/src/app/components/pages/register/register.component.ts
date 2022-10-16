import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password-match.validator';
import { UserRegister } from '../../../shared/interfaces/user.register.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl= '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]]
    },{
        validators: PasswordsMatchValidator('password','confirmPassword')
      }
    );
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

  onSubmit(f:UserRegister){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    this.userService.onRegister(f)
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl)
      })
  }

}
