import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticateUser, UserLogin, UserRegister } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private apiUrl = 'http://localhost:3030';
  private apiUrl = 'http://humorous-oryx-ace.ngrok-free.app';

  constructor(private http: HttpClient) { }

  hasTokenAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const rol = localStorage.getItem('rol');
      console.log("rol usersService",  rol)
      return rol === 'admin';
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  hasTokenUser(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const rol = localStorage.getItem('rol');
      console.log("rol usersService",  rol)
      return rol === 'user';
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  register(user: UserRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  isAuthenticated(email:string): Observable<any> {
    console.log("ENTRO SERVICIO")
    console.log("Email servicio",email)
    return this.http.post(`${this.apiUrl}/isAuthenticated`, {email});
  }

  authenticateUser(user:AuthenticateUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticateUser`, user);
  }
}
