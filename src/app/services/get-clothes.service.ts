import { Injectable } from '@angular/core';
import { clothes, question } from '../types/type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetClothesService {
  //obtengo url del para acceder al endpoint
  private url = 'https://66df3c21de4426916ee3fcf9.mockapi.io/api/data';
  //le proveeo con el constructor el http handler de angular
  constructor(private http: HttpClient) { }
  //get que devuelve un array ovservable con el tipo clothes
  getAll(): Observable<clothes[]> {
    return this.http.get<clothes[]>(this.url);
  }
  //getById que devuelve un observable del tipo clothes
  getProduct(id: string): Observable<clothes> {
    return this.http.get<clothes>(this.url + '/' + id);
  }

}
