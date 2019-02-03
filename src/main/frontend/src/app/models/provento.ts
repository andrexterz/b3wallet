import { Acao } from "./acao";

export class Provento {
  id: number;
  acao: Acao;
  valor: number = 0;
  dataEx: Date;
  dataPagamento: Date;
}