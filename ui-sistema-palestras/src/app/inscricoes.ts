import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inscricao {
  id: number;
  idUsuario: number;
  idPalestra: number;
}

@Injectable({
  providedIn: 'root',
})
export class InscricaoApi {
  private apiUrl = "http://localhost:3000/api";
  constructor(private http: HttpClient) { }

  listar(): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`${this.apiUrl}/inscricoes`);
  }

  buscarPorId(id: number): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`${this.apiUrl}/inscricoes/usuario/${id}`);
  }

  salvarInscricao(idUsuario: number, idPalestra: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inscricao`, {
      idUsuario,
      idPalestra
    });
  }

  cancelarInscricao(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/inscricoes/${id}`);
  }
}
