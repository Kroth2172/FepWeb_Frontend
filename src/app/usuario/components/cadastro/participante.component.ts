import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ParticipanteService, Participante, UsuarioService, } from '../../../shared';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfValidator } from 'src/app/shared/validators';
import { Sexo } from 'src/app/shared/models/sexo.enum';
import { EstadoCivil } from 'src/app/shared/models/estado-civil.enum';
import { Status } from 'src/app/shared/models/status.enum';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {

  form: FormGroup;
  sexos: string[];
  estadosCivil: string[];
  status: string[];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: UsuarioService,
    private participanteService: ParticipanteService) { }

  ngOnInit() {
    this.gerarForm();
    this.sexos = [
      Sexo.MASCULINO,
      Sexo.FEMININO,
    ];
    this.estadosCivil = [
      EstadoCivil.CASADO,
      EstadoCivil.SOLTEIRO,
    ];
    this.status = [
      Status.ATIVO,
      Status.INATIVO,
    ];
  }

  gerarForm() {
    this.form = this.fb.group({
      codigo: ['', [Validators.required]],
      codigoExterno: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, CpfValidator]],
      sexo: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      data: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  cadastrar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.participanteService.cadastrar(this.obterParticipante(dados))
      .subscribe(
        data => {
          const msg: string = "Participante cadastrado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });

          this.usuarioService.verificaUsuarioAdmin()
            .subscribe(
              data => {
                if (data) {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['/usuario/listagem']);
                }
              },
              err => {
                let msg: string = "Tente novamente em instantes.";
                if (err.status == 400) {
                  msg = err.error.errors.join(' ');
                }
                this.snackBar.open(msg, "Erro", { duration: 5000 });
              }
            );
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
    sessionStorage['usuarioId'] = 0;
  }

  obterParticipante(dados: any): Participante {
    const data = moment(dados.data);
    return new Participante(
      dados.codigo,
      dados.codigoExterno,
      dados.nome,
      dados.email,
      dados.cpf,
      dados.sexo,
      dados.estadoCivil,
      dados.observacao,
      data.format('YYYY-MM-DD HH:mm:ss'),
      dados.status,
      this.usuarioId,
      ""
    );
  }

  get usuarioId(): string {
    return sessionStorage['usuarioId'];
  }

}

