import { Acao } from "./acao";
import { TipoProventoEnum } from "./tipoProventoEnum";

export class Provento {
  id: number;
  acao: Acao;
  valor: number = 0;
  dataEx: Date;
  dataPagamento: Date;
  tipoProvento: string;
}
