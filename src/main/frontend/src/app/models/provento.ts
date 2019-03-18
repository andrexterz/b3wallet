import { Papel } from "./papel";

export class Provento {
  id: number;
  papel: Papel;
  valor: number = 0;
  dataEx: Date;
  dataPagamento: Date;
  tipoProvento: string;
}
