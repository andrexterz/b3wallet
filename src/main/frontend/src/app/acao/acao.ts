import { Operacao } from '../operacao/operacao';
import { OperacaoEnum } from '../operacao/operacaoEnum';
 export class Acao {

    id: number;
    codigo: string;
    nome: string;
    operacoes: Operacao[] = [];
  
    getCustodia(): number {
        console.log("função getCustodia() foi chamada");
        
        let totalCustodia:number = 0;
        
            this.operacoes.forEach((op: Operacao) => {
                
                if (op.tipoOperacao === <any>'COMPRA') {
                    totalCustodia += op.quantidade;
                } else {
                    totalCustodia -= op.quantidade;
                }
        });
        
        return totalCustodia;
  }
}
