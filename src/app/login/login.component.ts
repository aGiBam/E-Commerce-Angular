import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string = '';
  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });
  private _Router: any;
  private _AuthService: any;

  loginSubmit(rForm: FormGroup) {
    this._AuthService.sendLogin(rForm.value).subscribe({
      next: (res: any) => {
        this._Router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      },
    });
  }

  // constructor(private _AuthService: AuthService, private _Router:Router) {}
}
