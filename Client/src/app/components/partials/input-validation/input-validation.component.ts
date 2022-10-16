import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required:'Should not be empty',
  email:'Email is not valid',
  minlength:'Field is too short',
  notMatch:'passwords does not matches each other',
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()control!:AbstractControl;
  @Input()showErrorsWhen = true;
  errorMessages: string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges
        .subscribe(()=>{
          this.checkValidation()
        });

    this.control.statusChanges
        .subscribe(()=>{
          this.checkValidation()
        })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

}
