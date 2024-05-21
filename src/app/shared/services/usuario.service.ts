import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Participante } from '../models';
import { HttpUtilService } from './http-util.service';

@Injectable()
export class UsuarioService {

	private readonly PATH: string = 'usuarios';
	private readonly PATH_POR_EMPRESA = '/empresa/{empresaId}';
	private readonly PATH_USUARIO_POR_ID = '/{usuarioId}';

	constructor(
		private http: HttpClient,
		private httpUtil: HttpUtilService) { }

	listarUsuariosPorEmpresa(): Observable<any> {
		return this.http.get(
			env.baseApiUrl + this.PATH +
			this.PATH_POR_EMPRESA.replace(
				'{empresaId}', this.httpUtil.obterIdEmpresa()),
			this.httpUtil.headers()
		);
	}

	verificaUsuarioAdmin(): Observable<any> {
		return this.http.get(
			env.baseApiUrl + this.PATH +
			this.PATH_USUARIO_POR_ID.replace(
				'{usuarioId}', this.httpUtil.obterIdUsuario()),
			this.httpUtil.headers()
		);
	}

}








