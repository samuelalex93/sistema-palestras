import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface respostaLogin {
  message: string;
  tipoMensagem: string;
  userData: {
    id: number;
    email: string;
    nome: string;
    admin: boolean;
  };
}
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = "http://localhost:3000/api";
  private key = "userData";
  constructor(private router: Router, private http: HttpClient) { }

  login(userData: { id: number; email: string; nome: string; admin: boolean }): void {
    localStorage.setItem(this.key, JSON.stringify(userData));
  }
  getUser(): { id: number; email: string; nome: string; admin: boolean } | null {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
  logout(): void {
    localStorage.removeItem(this.key);
    this.router.navigateByUrl("/login");
  }

  loginUser(form: any) {
    return this.http.post<respostaLogin>(
        `${this.apiUrl}/login`,
        form
      )
  }

}
