import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { user } from '../types/type';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `

<div class="container">
      <h1>Register</h1>
      <div class="formContainer">
        <form [formGroup]="register" (submit)="handleSubmit()" >
          <label for="name"Name>Name</label>
          <input
          type="text"
          placeholder="Write your name here..."
          class="formInput {{name?.invalid && name?.touched ? 'redBorder' : ''}}"
          id="name"
          formControlName="name"
          autocomplete="additional-name"
          >
          @if (name?.hasError('required') && name?.touched) {
            <p class="error">Name is required</p>
          }
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
            <p class="error">Name is required</p>
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
            <p class="error">Name is required</p>
          }
          <input type="submit" class="submitButton" value="Register">

          @if (this.submited) {
            <p>Register successful</p>
          }
        </form>
      </div>
    </div>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public submited: boolean = false;

  // get all y buscar desde ahi cual usuario coincide con el password

  constructor(private apiUser:UserService ) { }
  // @Output() sendpassword = new EventEmitter<password>();
  register = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
  })

  get name() { return this.register.get('name'); }
  get email() { return this.register.get('email'); }
  get password() { return this.register.get('password'); }

  handleSubmit() {
    console.log("click");

    if (this.register.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const newUser: user = {
      id: this.name!.value,
      name: this.name!.value,
      email: this.email!.value,
      password: this.password!.value
    };

    console.log("Datos de la pregunta:", newUser);

    try {
      this.apiUser.postUser(newUser).subscribe({
        next: (response) => {
          console.log("Respuesta de la API:", response);
          // this.sendpassword.emit(NewUser);
        },
        error: (error) => {
          console.error('Error submitting password:', error);
        }
      });
    } catch (error: any) {
      console.error('Error en el try/catch:', error);
    }

    this.submited = true;
  }


}
