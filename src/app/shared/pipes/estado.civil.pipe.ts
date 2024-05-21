import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCivil } from '../models/estado-civil.enum';

@Pipe({
	name: 'estadoCivil'
})
export class EstadoCivilPipe implements PipeTransform {

	transform(estadoCivil: EstadoCivil, args?: any): string {
		return this.obterTexto(estadoCivil);
	}

	obterTexto(estadoCivil: EstadoCivil): string {
		let estadoCivilDesc: string;
		switch (estadoCivil) {
			case EstadoCivil.CASADO:
				estadoCivilDesc = 'Casado';
				break;
			case EstadoCivil.SOLTEIRO:
				estadoCivilDesc = 'Solteiro';
				break;
			default:
				estadoCivilDesc = estadoCivil;
				break;
		}
		return estadoCivilDesc;
	}

}
