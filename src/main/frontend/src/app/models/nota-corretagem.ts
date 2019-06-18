import { Operacao } from './operacao';

export class NotaCorretagem {
    id: number;
    numero: number;
    dataPregao: Date;
    operacoes: Operacao[] = [];
    taxaLiquidacao: number = 0;
    taxaRegistro: number = 0;
    taxaTermo: number = 0;
    taxaAna: number = 0;
    emolumentos: number = 0;
    corregatem: number = 0;
    iss: number = 0;
    irrf: number = 0;
    outrasDespesas: number = 0;
    dataCriacao: Date;
    dataAtualizacao: Date;

    get totalTaxas(): number {
        return (
            this.taxaLiquidacao +
            this.taxaRegistro +
            this.taxaTermo +
            this.taxaAna +
            this.emolumentos +
            this.corregatem +
            this.outrasDespesas
        );
    }

    get totalNota(): number {
        const t = (total, value) => total + value;
        let totalOperacoes: number[] = [];
        this.operacoes.forEach(o => {
            totalOperacoes.push(o.tipoOperacao == 'COMPRA' ? o.totalOperacao * -1: o.totalOperacao);
        });
        return (totalOperacoes.reduce(t) - this.totalTaxas);
    }
}
