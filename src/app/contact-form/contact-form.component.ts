import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { question } from '../types/type';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `

<div class="container">
      <h1>Contact Us</h1>
      <div class="formContainer">
        <form [formGroup]="contactForm" (submit)="handleSubmit()" >
          <label for="name">Name</label>
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
          <label for="question">Question</label>
          <input
          type="text"
          placeholder="Write your question here..."
          class="bigTextInput {{question?.invalid && question?.touched ? 'redBorder' : ''}}"
          id="question"
          formControlName="question"
          autocomplete="question"
          >
          @if (question?.hasError('required') && question?.touched) {
            <p class="error">Name is required</p>
          }
          <input type="submit" class="formInput submit" value="Send">
          @if (this.submited) {
            <p>Question submitted successfully</p>
          }
        </form>
      </div>
    </div>
  `,
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  submited = false;

  constructor(private apiQuestion: ContactService) { }
  // @Output() sendQuestion = new EventEmitter<question>();
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    question: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(10)])
  })

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get question() { return this.contactForm.get('question'); }

  handleSubmit() {
    console.log("click");

    if (this.contactForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const newQuestion: question = {
      name: this.name!.value,
      email: this.email!.value,
      question: this.question!.value
    };

    console.log("Datos de la pregunta:", newQuestion);

    try {
      this.apiQuestion.postQuestion(newQuestion).subscribe({
        next: (response) => {
          console.log("Respuesta de la API:", response);
          // this.sendQuestion.emit(newQuestion);
        },
        error: (error) => {
          console.error('Error submitting question:', error);
        }
      });
    } catch (error: any) {
      console.error('Error en el try/catch:', error);
    }

    this.submited = true;
  }


}
