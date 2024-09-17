import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet , } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <div class="navContainer">
        <img src="icon.svg" alt="" width="50px">
        <ul>
          <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
          @if (this.isLogged===false) {
            <li><a [routerLink]="['/login', isLogged ]" routerLinkActive="active" (loggedSuccess)="showName($event)">Login</a></li>
            <li><a routerLink="/register" routerLinkActive="active">Register</a></li>
          }
          <li><a routerLink="/contact" routerLinkActive="active">Contact Us</a></li>
        </ul>
      </div>
      @if(isLogged===true) {
       {{name}}
      }
    </nav>
    <hr>

<!--
    carrousel con productos en oferta (secundario, hacer solo depues de haber termiando)
    login funcional(secundario pero mas importante que el carrousel, 1:00:00 de la clase 4)
    productos particulares (1:59:00 de la clase 4)
    formulario de contacto aparte (1:20:00 de la clase 3)


    falta
    recibir las questions de ContactForm
    login
    recibir los inputs del login
    -->
    <div class="mainContainer">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {

  public name: string = ''
  title = 'app';
  isLogged: boolean = false;

  showName(dato:any){
    this.name=dato
    this.isLogged=true
  }



}
