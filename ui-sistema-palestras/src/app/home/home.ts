import { InscricaoApi, Inscricao, } from './../inscricoes';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';
import { Router } from '@angular/router';

import { PalestraApi, Palestra } from "../palestra";
import { ChangeDetectorRef } from '@angular/core';

interface UserData {
  id: number;
  email: string;
  nome: string;
  admin: boolean;
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
    private inscricaoApi: InscricaoApi,
    private cd: ChangeDetectorRef,
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

    this.inscricaoApi.buscarPorId(this.userData.id).subscribe({
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

  get palestrasDisponiveis(): Palestra[] {
    if (this.userData?.admin) {
      return this.palestras;
    }
    return this.palestras.filter(p => !this.estaInscrito(p.id));
  }

  obterIdInscricao(idPalestra: number): number | undefined {
    return this.minhasInscricoes.find(i => i.idPalestra === idPalestra)?.id;
  }

  cancelarInscricao(idInscricao: number): void {
    if (!idInscricao) return;

    if (!confirm('Deseja cancelar sua inscrição neste evento?')) return;

    this.inscricaoApi.cancelarInscricao(idInscricao).subscribe({
      next: (res) => {
        alert(res.message);
        this.carregarMinhasInscricoes();
      },
      error: (err) => {
        alert(err.error?.message ?? 'Erro ao cancelar inscrição');
      }
    });
  }

  inscricao(idPalestra: number): void {
    const idUsuario = this.userData?.id;
    if (!idUsuario) return;

    this.inscricaoApi.salvarInscricao(
      idUsuario,
      idPalestra
    ).subscribe({
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