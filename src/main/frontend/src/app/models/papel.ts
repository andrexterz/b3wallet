import { Operacao, Empresa } from '.';

 export class Papel {

    id: number;
    codigo: string;
    empresa: Empresa;
    operacoes: Operacao[] = [];
    totalCompra: number = 0;
    totalVenda: number = 0;
    totalCustodia: number = 0;
    precoMedio: number = 0;
    totalLucro: number = 0;
}
