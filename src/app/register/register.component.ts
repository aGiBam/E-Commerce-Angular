import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage!: string;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(01)[125][0-9]{8}$/),
      ]),
    },
    this.validatePassword
  );

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(01)[125][0-9]{8}$/),
      ]),
    },
    this.validatePassword
  );


  registerSubmit(rForm: FormGroup) {
    this._AuthService.sendRegister(rForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }

  constructor(private _AuthService: AuthService) {}

  validatePassword(g: any) {
    return g.get('password').value === g.get('rePassword').value
      ? null
      : { notSame: true };
  }



  validatePassword(g: any) {
    return g.get('password').value === g.get('rePassword').value
      ? null
      : { notSame: true };
  }
}
