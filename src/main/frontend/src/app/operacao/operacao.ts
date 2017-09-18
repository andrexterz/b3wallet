import { Acao } from "../acao/acao";
import { OperacaoEnum } from './operacaoEnum';

export class Operacao {
  id: number;
  acao: Acao;
  valor: number;
  dataOperacao: Date;
  quantidade: number;
  tipoOperacao: OperacaoEnum;
}
