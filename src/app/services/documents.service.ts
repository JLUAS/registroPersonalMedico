import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl = 'http://localhost:3030';
  // private apiUrl = 'https://humorous-oryx-ace.ngrok-free.app';

  addDocs(user: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/user/addUserInfo`, user);
  }

  getUserInfo(info:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/admin/getUsers`, info);
  }
}
