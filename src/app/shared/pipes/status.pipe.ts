import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/status.enum';

@Pipe({
	name: 'status'
})
export class StatusPipe implements PipeTransform {

	transform(status: Status, args?: any): string {
		return this.obterTexto(status);
	}

	obterTexto(status: Status): string {
		let statusDesc: string;
		switch (status) {
			case Status.ATIVO:
				statusDesc = 'Ativo';
				break;
			case Status.INATIVO:
				statusDesc = 'Inativo';
				break;
			default:
				statusDesc = status;
				break;
		}
		return statusDesc;
	}

}
