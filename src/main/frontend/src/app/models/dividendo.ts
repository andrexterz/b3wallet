import { Acao } from "./acao";

export class Dividendo {
  id: number;
  acao: Acao;
  valor: number = 0;
  dataEx: Date;
  dataPagamento: Date;
}