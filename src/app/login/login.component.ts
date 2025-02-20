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
      // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });
  private _Router: Router;
  private _AuthService: AuthService;

  constructor(private authService: AuthService, private router: Router) {
    this._AuthService = authService;
    this._Router = router;
  }

  loginSubmit(rForm: FormGroup) {
    this._AuthService.sendLogin(rForm.value).subscribe({
      next: (res: any) => {
        //if everything is ok (status, user, token) = login
        //1-route to home page
        //2- save token in local storage
        //3- save user in local storage

        if (res.message === 'success') {
          this._Router.navigate(['/home']);
          localStorage.setItem('userToken', res.token);
          this._AuthService.saveData();
        }
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      },
    });
  }
}
