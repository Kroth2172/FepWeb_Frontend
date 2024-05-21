import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Participante, ParticipanteService } from '../../../shared';
import { Sexo } from 'src/app/shared/models/sexo.enum';
import { EstadoCivil } from 'src/app/shared/models/estado-civil.enum';
import { Status } from 'src/app/shared/models/status.enum';
import { CpfValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {

  form: FormGroup;
  participanteId: string;
  sexos: string[];
  estadosCivil: string[];
  status: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private participanteService: ParticipanteService) { }

  ngOnInit() {
    this.participanteId = this.route.snapshot.paramMap.get('participanteId');
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
    this.obterDadosParticipante();
  }

  obterDadosParticipante() {
    this.participanteService.buscarPorId(this.participanteId)
      .subscribe(
        dados => {
          const data = dados.data;
          this.form.get('codigo').setValue(data.codigo);
          this.form.get('codigoExterno').setValue(data.codigoExterno);
          this.form.get('nome').setValue(data.nome);
          this.form.get('email').setValue(data.email);
          this.form.get('cpf').setValue(data.cpf);
          this.form.get('sexo').setValue(data.sexo);
          this.form.get('estadoCivil').setValue(data.estadoCivil);
          this.form.get('observacao').setValue(data.observacao);
          this.form.get('data').setValue(data.data.substr(0, 10));
          this.form.get('status').setValue(data.status);
        },
        err => {
          let msg: string = "Erro obtendo participante";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      );
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

  atualizar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.participanteService.atualizar(this.obterParticipante(dados))
      .subscribe(
        data => {
          const msg: string = "Participante atualizado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
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
      this.participanteId
    );
  }

  get usuarioId(): string {
    return sessionStorage['usuarioId'];
  }

}
