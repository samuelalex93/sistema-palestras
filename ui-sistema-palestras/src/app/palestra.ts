import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Palestra {
  id: number;
  titulo: string;
  descricao: string;
  nomePalestrante: string;
  localEvento: string;
  dataEvento: string;
}

@Injectable({
  providedIn: 'root',
})

export class PalestraApi {
  private apiUrl = "http://localhost:3000/api/palestras";
  constructor(private http: HttpClient) { }
  listarPalestra(): Observable<Palestra[]> {
    return this.http.get<Palestra[]>(this.apiUrl);
  }
  
  buscarPorId(id: number): Observable<Palestra> {
    return this.http.get<Palestra>(`${this.apiUrl}/${id}`);
  }

  criar(palestra: Partial<Palestra>): Observable<Palestra> {
    return this.http.post<Palestra>(this.apiUrl, palestra);
  }

  atualizar(id: number, palestra: Partial<Palestra>): Observable<Palestra> {
    return this.http.put<Palestra>(`${this.apiUrl}/${id}`, palestra);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
