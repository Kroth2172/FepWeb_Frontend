import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ParticipanteService,
  Participante,
  Usuario,
  HttpUtilService,
  UsuarioService
} from '../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Participante>;
  colunas: string[] = ['codigo', 'codigoExterno', 'nome', 'email', 'cpf', 'sexo', 'estadoCivil', 'data', 'status', 'acao'];
  usuarioId: string;
  totalParticipantes: number;

  usuarios: Usuario[];
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private participanteService: ParticipanteService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterUsuarios();
    this.gerarForm();
    sessionStorage['usuarioId'] = 0;
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage['usuarioId'] || false;
  }

  cadastrarPJ() {
    this.router.navigate(['/cadastro-usuario']);
    sessionStorage['tipoCadastroUsuario'] = "Admin";
  }

  cadastrarPF() {
    this.router.navigate(['/cadastro-usuario']);
    sessionStorage['tipoCadastroUsuario'] = "Usuario";
  }

  obterUsuarios() {
    this.usuarioService.listarUsuariosPorEmpresa()
      .subscribe(
        data => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.usuarios = (data.data as Usuario[])
            .filter(func => func.id != usuarioId);

          if (this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirParticipantes();
          }
        },
        err => {
          const msg: string = "Erro obtendo usuários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  // Listar
  exibirParticipantes() {
    if (this.matSelect.selected) {
      this.usuarioId = this.matSelect.selected['value'];
    } else {
      return;
    }
    sessionStorage['usuarioId'] = this.usuarioId;

    this.participanteService.listarParticipantesPorUsuario(
      this.usuarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalParticipantes = data['data'].totalElements;
          const participantes = data['data'].content as Participante[];
          this.dataSource = new MatTableDataSource<Participante>(participantes);
        },
        err => {
          const msg: string = "Não foi encontrado registros!";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirParticipantes();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirParticipantes();
  }

  removerDialog(participanteId: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(participanteId);
      }
    });
  }

  remover(participanteId: string) {
    this.participanteService.remover(participanteId)
      .subscribe(
        data => {
          const msg: string = "Participante removido com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirParticipantes();
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

}

@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente remover o participante?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">
        Não
      </button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">
        Sim
      </button>
    </div>
  `,
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
