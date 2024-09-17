import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GetClothesService } from '../services/get-clothes.service';
import { RouterLink } from '@angular/router';
import { clothes } from '../types/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  template: `
    @let product = this.product$ | async;

    @if(product){
    <div class="main">
      <div class="image">
        <img src="{{product?.images}}" alt="" width="100%">
      </div>
      <div class="text">

      <h1>{{product?.product}}</h1>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, eos neque fuga reprehenderit accusantium amet vero odit voluptate magni enim possimus eius architecto quos aliquam dolore expedita blanditiis officiis. Earum?
      </h3>
      <p>$ {{product?.price}}</p>
      <p>Stock: {{product?.stock}}</p>

      <button class="buyButton">Comprar</button>
      <button class="backButton" routerLink="/home">Volver</button>

      </div>
    </div>

    }@else {
      <p>Cargando...</p>
    }
    <!-- <a (click)="showId(product!.id!.toString())">showId</a> -->
  `,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @Input("id") productId!: string

  public product$!: Observable<clothes>

  constructor(private getClothes: GetClothesService ){}

  ngOnInit(): void{
    this.product$ = this.getClothes.getProduct(this.productId);
  }


   showId(id:any){
     console.log(id);
   }
}
