import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { question } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url = 'https://66df3c21de4426916ee3fcf9.mockapi.io/api/contact';

  constructor(private http: HttpClient) {}

  postQuestion(newQuestion: question) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<question>(this.url, newQuestion, { headers });
  }
}
