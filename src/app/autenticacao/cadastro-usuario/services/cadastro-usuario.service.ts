import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment';
import { CadastroUsuario } from '../models';


@Injectable()
export class CadastrarUsuarioService {

  private readonly PATH_PJ: string = 'cadastrar-pj';
  private readonly PATH_PF: string = 'cadastrar-pf';

  constructor(private http: HttpClient) { }

  cadastrar(cadastrUsuario: CadastroUsuario): Observable<any> {
    const tipoCadastro = sessionStorage['tipoCadastroUsuario'];

    if (tipoCadastro == 'Admin') { 
      return this.http.post(env.baseApiUrl + this.PATH_PJ, cadastrUsuario);
    } else {
      return this.http.post(env.baseApiUrl + this.PATH_PF, cadastrUsuario);
    }
  }
}
