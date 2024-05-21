import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ParticipanteService, Participante, Usuario, HttpUtilService, UsuarioService } from '../../../shared';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Participante>;
  colunas: string[] = ['codigo', 'nome', 'email', 'sexo', 'estadoCivil', 'data', 'status'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private participanteService: ParticipanteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.participanteService.listarTodosParticipantes()
      .subscribe(
        data => {
          const participantes = data['data'] as Participante[];
          this.dataSource = new MatTableDataSource<Participante>(participantes);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          if (participantes && participantes[0]) {
            sessionStorage['usuarioId'] = participantes[0].usuarioId;
          }

        },
        err => {
          const msg: string = "Erro obtendo participantes.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}