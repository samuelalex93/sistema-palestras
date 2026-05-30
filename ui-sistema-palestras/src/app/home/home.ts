import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';
import { Router } from '@angular/router';

import { PalestraApi, Palestra } from "../palestra";
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  id: number;
  email: string;
  nome: string;
  admin: boolean;
}

interface Inscricao {
  ID: number;
  idUsuario: number;
  idPalestra: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  palestras: Palestra[] = [];
  userData: UserData | null = null;
  minhasInscricoes: Inscricao[] = [];

  constructor(
    private authService: Auth,
    private router: Router,
    private palestraApi: PalestraApi,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    if (!this.userData) {
      this.router.navigateByUrl("/login");
    }

    this.palestraApi.listarPalestra().subscribe({
      next: (dados) => {
        this.palestras = dados;
        this.cd.detectChanges();
      },
      error: (err) => console.log("Erro ao carregar dados", err),
    });

    if (this.userData && !this.userData.admin) {
      this.carregarMinhasInscricoes();
    }
  }

  carregarMinhasInscricoes(): void {
    if (!this.userData) return;

    this.http.get<Inscricao[]>(
      `http://localhost:3000/api/inscricoes/usuario/${this.userData.id}`
    ).subscribe({
      next: (inscricoes) => {
        this.minhasInscricoes = inscricoes;
        this.cd.detectChanges();
      },
      error: (err) => console.log("Erro ao carregar inscrições", err),
    });
  }

  estaInscrito(idPalestra: number): boolean {
    return this.minhasInscricoes.some(i => i.idPalestra === idPalestra);
  }

  inscricao(idPalestra: number): void {
    const idUsuario = this.userData?.id;
    if (!idUsuario) return;

    this.http.post<any>("http://localhost:3000/api/inscricao", {
      idUsuario,
      idPalestra
    }).subscribe({
      next: (res) => {
        alert(res.message);
        this.carregarMinhasInscricoes();
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }
}