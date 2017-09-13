import { TipoOperacao } from "./tipo-operacao";

export class Acao {
  constructor(codigo: string) {
    this.codigo = codigo;
  }
  id: number;
  codigo: string;
  nome: string;
}
