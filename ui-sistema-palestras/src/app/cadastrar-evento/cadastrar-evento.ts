import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from
  '@angular/forms';
import { Router } from '@angular/router';
import { CadastroApi } from '../cadastro';

@Component({
  selector: 'app-cadastrar-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-evento.html',
  styleUrl: './cadastrar-evento.css',
})
export class CadastrarEvento {
  constructor(
    private cadastroApi: CadastroApi,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  mensagem: string = '';
  tipoMensagem: 'success' | 'danger' = 'success';

  formularioPalestras = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    nomePalestrante: new FormControl('', Validators.required),
    localEvento: new FormControl('', Validators.required),
    dataEvento: new FormControl('', Validators.required)
  });

  onSubmit() {

    if (this.formularioPalestras.valid) {
      this.cadastroApi.salvarEvento(
          this.formularioPalestras.value
        )
        .subscribe({
          next: (res) => {
            this.tipoMensagem = 'success';
            this.mensagem = res.message;
            this.cdr.detectChanges();
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          },
          error: (err) => {
            this.tipoMensagem = 'danger';
            if (err?.status === 400) {
              this.mensagem =
                err?.error?.message || 'Erro ao cadastrar palestra/evento';

            } else {
              this.mensagem =
                err?.error?.message || 'Erro interno ao salvar os dados';
            }
            this.cdr.detectChanges();
          },
        });
    }
  }

}
