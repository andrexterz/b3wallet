import { Acao } from "./acao";

export class Operacao {
  id: number;
  acao: Acao;
  valor: number = 0;
  quantidade: number = 0;
  tipoOperacao: string;
  custoOperacao: number = 0;
  totalOperacao: number = 0;
  dataOperacao: Date;
}
