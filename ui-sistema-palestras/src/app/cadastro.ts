import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface respostaCadastro {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CadastroApi {

  private apiUrl = "http://localhost:3000/api/";
    constructor(private http: HttpClient) { }
  
    salvarCadastro(form: any): Observable<respostaCadastro> {
      return this.http.post<respostaCadastro>(`${this.apiUrl}cadastro`, form);
    }

    salvarEvento(form: any): Observable<respostaCadastro> {
      return this.http.post<respostaCadastro>(`${this.apiUrl}admin`, form);
    }
}
