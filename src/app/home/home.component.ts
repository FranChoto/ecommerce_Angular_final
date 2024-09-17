import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { GetClothesService } from '../services/get-clothes.service';
import { Observable } from 'rxjs';
import { clothes } from '../types/type';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, FormsModule, RouterLink],
  template: `

  <div class="main">
      <h1>Home</h1>
      @if (data$ | async; as clothes) {
        <input
        type="text"
        [(ngModel)]="busqueda"
        >

        <div class="productDisplay">
          @for (dato of clothes; track dato.id) {
        @if (dato.product.toUpperCase().includes(busqueda.toUpperCase())) {
          <div class="productCard" (click)="redirect(dato.id)">
            <img src="{{dato.images}}" alt="" width="100%">
            <p>{{dato.product}}</p>
            <p>$ {{dato.price}}</p>
          </div>
        }
      }
    </div>
    } @else {
      <p>Cargando...</p>

    }
    </div>
    `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  busqueda: string = '';
  //proveeo el servicio getclothes.service.ts para que sea usable en el componente
  constructor(private apiClothes: GetClothesService, private router: Router) { }
  //creo la variable data$ ($ al final porque es un observable) y le pongo el operador de asercion "!" para poder asegurarle que no va a llegar indefinido
  public data$!: Observable<clothes[]>
  //ustilizo el metodo onInit para que se ejecute al iniciar el componente similar al useEffect en react
  //void porque no devuelve nada
  ngOnInit(): void {
    this.data$ = this.apiClothes.getAll();
  }

  redirect(productId: any){
    this.router.navigate(['/product', productId]);
  }
}


