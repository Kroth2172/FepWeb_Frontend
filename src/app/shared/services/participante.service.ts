import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Participante } from '../models';
import { HttpUtilService } from './http-util.service';

@Injectable()
export class ParticipanteService {

  private readonly PATH: string = 'participantes';
  private readonly PATH_ULTIMO_PARTICIPANTE = '/usuario/{usuarioId}/ultimo';
  private readonly PATH_PARTICIPANTE = '/usuario/{usuarioId}';
  private readonly PATH_TODOS = '/usuario/{usuarioId}/todos';

  constructor(
  	private http: HttpClient,
  	private httpUtil: HttpUtilService) { }

  buscarUltimoParticipanteUsuario(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_ULTIMO_PARTICIPANTE.replace(
            '{usuarioId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }

  cadastrar(participante: Participante): Observable<any> {
  	return this.http.post(
  	  	env.baseApiUrl + this.PATH, 
  	  	participante,
  	  	this.httpUtil.headers()
  	);
  }

  listarTodosParticipantes(): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + 
          this.PATH_TODOS.replace(
            '{usuarioId}', this.httpUtil.obterIdUsuario()),
        this.httpUtil.headers()
    );
  }

  listarParticipantesPorUsuario(
      usuarioId: string,
      pagina: number, 
      ordem: string, 
      direcao: string): Observable<any> {

    const url: string = env.baseApiUrl + this.PATH + 
      this.PATH_PARTICIPANTE.replace('{usuarioId}', usuarioId);
    
    const params: string = '?pag=' + pagina +
      '&ord=' + ordem + '&dir=' + direcao;
    
    return this.http.get(url + params, this.httpUtil.headers());
  }

  remover(participanteId: string): Observable<any> {
    return this.http.delete(
        env.baseApiUrl + this.PATH + '/' + participanteId,
        this.httpUtil.headers()
    );
  }

  buscarPorId(participanteId: string): Observable<any> {
    return this.http.get(
        env.baseApiUrl + this.PATH + '/' + participanteId,
        this.httpUtil.headers()
    );
  }

  atualizar(participante: Participante): Observable<any> {
    return this.http.put(
        env.baseApiUrl + this.PATH + '/' + participante.id, 
        participante,
        this.httpUtil.headers()
    );
  }

}










