import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroApi } from '../cadastro';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})

export class Cadastro {


  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cadastroApi: CadastroApi,
  ) { }

  formularioCadastro = new FormGroup({
    email: new FormControl('', Validators.required),
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  mensagem: string = '';
  tipoMensagem: 'success' | 'danger' = 'success';

  onSubmit() {
    if (this.formularioCadastro.valid) {
      this.cadastroApi.salvarCadastro(
        this.formularioCadastro.value
      )
        .subscribe({
          next: (res) => {
            this.tipoMensagem = 'success';
            this.mensagem = res.message;
            this.cdr.detectChanges();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (err) => {
            this.tipoMensagem = 'danger';
            if (err?.status === 400) {
              this.mensagem = err?.error?.message || 'Email já cadastrado';
            } else {
              this.mensagem = err?.error?.message || 'Erro ao cadastrar';
            }
            this.cdr.detectChanges();
          },
        });
    }
  }
}