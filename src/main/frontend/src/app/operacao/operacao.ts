import { Acao } from "../acao/acao";

export class Operacao {
  id: number;
  acao: Acao;
  valor: number;
  dataOperacao: Date;
  quantidade: number;
  tipoOperacao: string;
}
