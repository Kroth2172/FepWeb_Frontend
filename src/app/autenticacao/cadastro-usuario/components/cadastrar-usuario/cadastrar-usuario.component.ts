import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  CpfValidator,
  CnpjValidator
} from '../../../../shared/validators';
import { CadastrarUsuarioService } from '../../services';
import { CadastroUsuario } from '../../models';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  form: FormGroup;
  tipoCadastroUsuario: string;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastrarUsuarioService: CadastrarUsuarioService) { }

  ngOnInit() {
    this.gerarForm();
    this.tipoCadastroUsuario = sessionStorage['tipoCadastroUsuario'];
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      razaoSocial: [''],
      cnpj: ['', [Validators.required, CnpjValidator]]
    });
  }

  cadastrar() {
    if (this.form.invalid) {
      return;
    }
    const cadastroPj: CadastroUsuario = this.form.value;
    this.cadastrarUsuarioService.cadastrar(cadastroPj)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          const msg: string = "Realize o login para acessar o sistema.";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/login']);
        },
        err => {
          console.log(JSON.stringify(err));
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
    sessionStorage['usuarioId'] = 0;
    return false;
  }

}
