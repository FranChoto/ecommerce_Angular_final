import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://66df3c21de4426916ee3fcf9.mockapi.io/api/user';

  constructor(private http: HttpClient) {}

  getUsers(){
    return this.http.get<user[]>(this.url);
  }

  postUser(newUser: user) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<user>(this.url, newUser, { headers });
  }
}
