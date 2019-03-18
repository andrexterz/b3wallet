import { Operacao } from './operacao';

export class NotaCorretagem {
    id: number;
    numero: number;
    dataPregao: Date;
    operacoes: Operacao[];
    taxaLiquidacao: number;
    taxaRegistro: number;
    taxaTermo: number;
    taxaAna: number;
    emolumentos: number;
    corregatem: number;
    iss: number;
    irrf: number;
    outrasDespesas: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
}
