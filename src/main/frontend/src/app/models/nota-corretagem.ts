import { Operacao } from './operacao';

export class NotaCorretagem {
    id: number;
    numero: number;
    dataPregao: Date;
    operacoes: Operacao[] = [];
    taxaLiquidacao: number = 0;
    taxaRegistro: number = 0;
    taxaTermo: number = 0;
    taxaANA: number = 0;
    emolumentos: number = 0;
    corregatem: number = 0;
    iss: number = 0;
    irrf: number = 0;
    outrasDespesas: number = 0;
    dataCriacao: Date;
    dataAtualizacao: Date;
}
