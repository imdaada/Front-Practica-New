import { Component, OnInit } from '@angular/core';
import {RegisterRequest} from './register-request';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password = '';

  constructor(private userService: UserService, private router: Router) {
    this.registerRequest = new RegisterRequest();
  }
  registerRequest: RegisterRequest;


  req = new FormControl('', Validators.required);

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    surname: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    role: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email])
  });


  getErrorMessage() {
    if (this.registerForm.get("email")?.hasError('required')) {
      return '';
    }

    return this.registerForm.get("email")?.hasError('email') ? 'Введите коррекный email' : '';
  }

  ngOnInit(): void {
  }

  submit() {
    this.userService.register(this.registerRequest).subscribe(
      value => {
        alert('Вы успешно зарегистрированлсь, войдите в систему');
        this.router.navigateByUrl('/login');
      },
      error => {
        alert('Ошибка при регистрации! Возможно, введённый вами логин уже используется!');
      }
    );
  }
}
