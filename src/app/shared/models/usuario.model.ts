import { Participante } from './participante.model';

export class Usuario {

	constructor(public nome: string,
		public email: string,
		public cpf: string,
		public perfil: string,
		public participantes?: Participante[],
		public id?: string) { }

}
