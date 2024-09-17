import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../services/user.service';
import { user } from '../types/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `

<div class="container">
      <h1>Login</h1>
      <div class="formContainer">
        @let data = this.users$ | async;
        {{check(data)}}
        <form [formGroup]="login" (submit)="handleSubmit(data)" >
          <label for="email">Email</label>
          <input
          type="text"
          placeholder="Write yout email here..."
          class="formInput {{email?.invalid && email?.touched ? 'redBorder' : ''}}"
          id="email"
          formControlName="email"
          autocomplete="email"
          >
          @if (email?.hasError('required') && email?.touched) {
            <div class="error">
              <p>Email is required</p>
            </div>
          }
          <label for="password">Password</label>
          <input
          type="password"
          placeholder="Write your password here..."
          class="bigTextInput {{password?.invalid && password?.touched ? 'redBorder' : ''}}"
          id="password"
          formControlName="password"
          autocomplete="password"
          >
          @if (password?.hasError('required') && password?.touched) {
            <p class="error">Password is required</p>
          }
          <input type="submit" class="submitButton" value="Login">

          @if (this.submited===true && this.isLogged===true) {
            <p>Login successful</p>
          }@else if(this.submited) {
            <p>El email o la contraseña son incorrectos</p>
          }
        </form>
      </div>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  @Output() loggedSuccess = new EventEmitter<string>();
  @Input() isLogged?: boolean;

  public submited: boolean = false;

  // get all y buscar desde ahi cual usuario coincide con el password

  constructor(private apiUser:UserService ) { }
  public users$!: Observable<user[]>;
  // @Output() sendpassword = new EventEmitter<password>();
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
  })

  get email() { return this.login.get('email'); }
  get password() { return this.login.get('password'); }

  ngOnInit(): void {
    this.users$ = this.apiUser.getUsers();
  }

  handleSubmit(data: any) {
    for (let dato of data){
      if(dato.email===this.email?.value && dato.password===this.password?.value){
        this.isLogged = true;
        this.submited = true;
        this.loggedSuccess.emit(dato.name);
      }else{
        this.submited = true;
      }
    }

  }
  check(data:any){
    for (let dato of data){
      console.log(this.isLogged);
    }
  }


}
