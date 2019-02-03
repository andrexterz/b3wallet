import { Acao } from "./acao";

export class Nota {
  id: number;
  acao: Acao;
  anotacao: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
