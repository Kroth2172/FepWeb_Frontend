import { Pipe, PipeTransform } from '@angular/core';
import { Sexo } from '../models/sexo.enum';

@Pipe({
	name: 'sexo'
})
export class SexoPipe implements PipeTransform {

	transform(sexo: Sexo, args?: any): string {
		return this.obterTexto(sexo);
	}

	obterTexto(sexo: Sexo): string {
		let sexoDesc: string;
		switch (sexo) {
			case Sexo.MASCULINO:
				sexoDesc = 'Masculino';
				break;
			case Sexo.FEMININO:
				sexoDesc = 'Feminino';
				break;
			default:
				sexoDesc = sexo;
				break;
		}
		return sexoDesc;
	}

}
