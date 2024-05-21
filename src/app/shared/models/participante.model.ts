
export class Participante {

	constructor(
		public codigo: string,
		public codigoExterno: string,
		public nome: string,
		public email: string,

		public cpf: string,
		public sexo: string,
		public estadoCivil: string,
		public observacao: string,

		public data: string,
		public status: string,		
		public usuarioId: string,
		public id?: string
	) { }
}