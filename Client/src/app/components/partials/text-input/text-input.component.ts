import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input()control!:AbstractControl;
  @Input()showErrorsWhen = true;
  @Input()label!:string;
  @Input()type: 'text' | 'password' | 'email' = 'text'

  constructor() { }

  ngOnInit(): void {
  }

  get formControl(){
    return this.control as FormControl
  }

}
