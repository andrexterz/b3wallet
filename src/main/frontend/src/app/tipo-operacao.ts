import { Acao } from "./acao";
import { OperacaoEnum } from './operacaoEnum';

export class TipoOperacao {

  constructor(id: number, acao: Acao, valor: number, quantidade: number, dataOperacao: Date, operacao: OperacaoEnum) {
    this.id = id;
    this.valor = valor;
    this.dataOperacao = dataOperacao;
    this.quantidade = quantidade;
    this.operacao = operacao;
  }

  id: number;
  acao: Acao;
  valor: number;
  dataOperacao: Date;
  quantidade: number;
  operacao: OperacaoEnum;
}
