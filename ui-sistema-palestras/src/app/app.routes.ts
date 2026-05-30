import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';
import { Home } from './home/home';
//import { CadastrarEvento } from './cadastrar-evento/cadastrar-evento';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  //{ path: 'admin', component: CadastrarEvento }
];