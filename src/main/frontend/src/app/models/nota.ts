import { Empresa } from './empresa';

export class Nota {
  id: number;
  empresa: Empresa;
  anotacao: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
