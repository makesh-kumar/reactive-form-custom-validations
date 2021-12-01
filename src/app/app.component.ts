import { Component, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  userName = 'makes';
  password = '123';
  cusVal(str) {
    return (control: AbstractControl, v: string): ValidationErrors | null => {
      let val = control.value;
      if (val === str) {
        return { nameErr: true };
      } else {
        return null;
      }
    };
  }

  passValidator(pass, confPass) {
    return (control: AbstractControl): ValidationErrors | null => {
      let password = control.get(pass).value;
      let confirmPass = control.get(confPass).value;

      if (password !== confirmPass) {
        return { match: false };
      }

      return null;
    };
  }
  constructor(private fb: FormBuilder) {}

  userForm: FormGroup;
  formSubmit() {
    console.log(this.userForm);
    // console.log(this.userForm.controls['name'].value);
  }

  ngOnInit() {
    this.userForm = this.fb.group(
      {
        name: ['makesh', [this.cusVal('s')]],
        pass: [],
        confPass: [],
      },
      { validator: this.passValidator('pass', 'confPass') }
    );

    this.userForm.controls['name'].statusChanges.subscribe((val) => {
      console.log(val);
    });
  }

  updateValid() {
    this.userForm.controls['name'].clearValidators();
    this.userForm.controls['name'].setValidators([Validators.maxLength(3)]);

    this.userForm.controls['name'].updateValueAndValidity();
  }

  updateForm() {
    this.userForm.patchValue({
      name: ['sss'],
    });

    this.userForm.controls['name'].disable();
  }
  removeValidations() {
    console.log(this.userForm.controls['name']);
    console.log('dirty : ', this.userForm.controls['name'].dirty);
    console.log('pristine : ', this.userForm.controls['name'].pristine);

    console.log('touched : ', this.userForm.controls['name'].touched);
    console.log('untouched : ', this.userForm.controls['name'].untouched);

    // this.userForm.controls['name'].clearValidators();
    // this.userForm.updateValueAndValidity();
    // this.userForm.controls['name'].enable();
  }
}
