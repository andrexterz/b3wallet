import { Papel, NotaCorretagem } from '.';

export class Operacao {
  id: number;
  notaCorretagem: NotaCorretagem;
  papel: Papel;
  valor: number = 0;
  quantidade: number = 0;
  tipoOperacao: string;
  custoOperacao: number = 0;
  totalOperacao: number = 0;
  dataOperacao: Date;
}
