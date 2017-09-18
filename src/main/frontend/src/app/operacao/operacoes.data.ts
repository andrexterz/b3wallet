import { Acao } from '../acao/acao';
import {  Operacao } from "./operacao";
import {  OperacaoEnum } from "./operacaoEnum";

let parseDate = function(date: string) {
  let d = date.split('-');
  return new Date(Number.parseInt(d[0]), Number.parseInt(d[1]) - 1, Number.parseInt(d[2]))
}

export const OPERACOES: Operacao[] = [
//  {id:  1, acao: new Acao("OIBR4", "Oi S.A."), valor: 3.37, quantidade: 500, dataOperacao: parseDate('2017-08-17'), operacao: OperacaoEnum.COMPRA},
//  {id:  2, acao: new Acao("OIBR4", "Oi S.A."), valor: 3.61, quantidade: 400, dataOperacao: parseDate('2017-09-01'), operacao: OperacaoEnum.VENDA},
//  {id:  3, acao: new Acao("OIBR4", "Oi S.A."), valor: 3.53, quantidade: 100, dataOperacao: parseDate('2017-09-04'), operacao: OperacaoEnum.VENDA},
//  {id:  4, acao: new Acao("PETR4", "Petrobras S.A."), valor: 13.05, quantidade: 100, dataOperacao: parseDate('2017-08-14'), operacao: OperacaoEnum.COMPRA},
//  {id:  5, acao: new Acao("PETR4", "Petrobras S.A."), valor: 13.75, quantidade: 100, dataOperacao: parseDate('2017-08-30'), operacao: OperacaoEnum.VENDA},
//  {id:  6, acao: new Acao("PETR4", "Petrobras S.A."), valor: 13.85, quantidade: 200, dataOperacao: parseDate('2017-09-01'), operacao: OperacaoEnum.COMPRA},
//  {id:  7, acao: new Acao("PETR4", "Petrobras S.A."), valor: 14.00, quantidade: 100, dataOperacao: parseDate('2017-09-01'), operacao: OperacaoEnum.VENDA},
//  {id:  8, acao: new Acao("PETR4", "Petrobras S.A."), valor: 14.01, quantidade: 100, dataOperacao: parseDate('2017-09-01'), operacao: OperacaoEnum.VENDA},
//  {id:  9, acao: new Acao("PETR4", "Petrobras S.A."), valor: 14.39, quantidade: 100, dataOperacao: parseDate('2017-09-05'), operacao: OperacaoEnum.COMPRA},
//  {id: 10, acao: new Acao("PETR4", "Petrobras S.A."), valor: 14.65, quantidade: 100, dataOperacao: parseDate('2017-09-06'), operacao: OperacaoEnum.VENDA},
//  {id: 11, acao: new Acao("POMO4", "x"), valor: 3.91, quantidade: 200, dataOperacao: parseDate('2017-08-28'), operacao: OperacaoEnum.COMPRA},
//  {id: 12, acao: new Acao("POMO4", "x"), valor: 4.00, quantidade: 200, dataOperacao: parseDate('2017-09-01'), operacao: OperacaoEnum.VENDA},
//  {id: 13, acao: new Acao("ITSA4", "x"), valor: 10.15, quantidade: 100, dataOperacao: parseDate('2017-08-23'), operacao: OperacaoEnum.COMPRA},
//  {id: 14, acao: new Acao("ITSA4", "x"), valor: 10.35, quantidade: 100, dataOperacao: parseDate('2017-08-30'), operacao: OperacaoEnum.VENDA},
//  {id: 15, acao: new Acao("RANI3", "x"), valor: 2.70, quantidade: 200, dataOperacao: parseDate('2017-08-15'), operacao: OperacaoEnum.COMPRA},
//  {id: 16, acao: new Acao("RANI3", "x"), valor: 2.38, quantidade: 200, dataOperacao: parseDate('2017-09-05'), operacao: OperacaoEnum.VENDA},
//  {id: 17, acao: new Acao("TCSA3", "x"), valor: 2.40, quantidade: 500, dataOperacao: parseDate('2017-08-15'), operacao: OperacaoEnum.COMPRA},
//  {id: 18, acao: new Acao("TCSA3", "x"), valor: 2.41, quantidade: 500, dataOperacao: parseDate('2017-08-28'), operacao: OperacaoEnum.VENDA},
//  {id: 19, acao: new Acao("USIM5", "x"), valor: 6.75, quantidade: 100, dataOperacao: parseDate('2017-08-31'), operacao: OperacaoEnum.COMPRA},
//  {id: 20, acao: new Acao("USIM5", "x"), valor: 7.19, quantidade: 100, dataOperacao: parseDate('2017-09-01'), operacao: OperacaoEnum.VENDA},
//  {id: 21, acao: new Acao("ITSA3", "x"), valor: 9.96, quantidade: 200, dataOperacao: parseDate('2017-08-23'), operacao: OperacaoEnum.COMPRA},
//  {id: 22, acao: new Acao("ITSA3", "x"), valor: 10.00, quantidade: 200, dataOperacao: parseDate('2017-08-31'), operacao: OperacaoEnum.VENDA},
//  {id: 23, acao: new Acao("VVAR4", "x"), valor: 4.49, quantidade: 300, dataOperacao: parseDate('2017-08-16'), operacao: OperacaoEnum.COMPRA},
//  {id: 24, acao: new Acao("VVAR4", "x"), valor: 5.15, quantidade: 300, dataOperacao: parseDate('2017-09-01'), operacao: OperacaoEnum.VENDA},
//  {id: 25, acao: new Acao("TIET11", "x"), valor: 14.32, quantidade: 100, dataOperacao: parseDate('2017-08-25'), operacao: OperacaoEnum.COMPRA},
//  {id: 26, acao: new Acao("TIET11", "x"), valor: 14.34, quantidade: 100, dataOperacao: parseDate('2017-09-05'), operacao: OperacaoEnum.VENDA},
//  {id: 27, acao: new Acao("CSNA3", "x"), valor: 9.36, quantidade: 200, dataOperacao: parseDate('2017-09-04'), operacao: OperacaoEnum.COMPRA},
//  {id: 28, acao: new Acao("CSNA3", "x"), valor: 9.70, quantidade: 200, dataOperacao: parseDate('2017-09-06'), operacao: OperacaoEnum.VENDA},
//  {id: 29, acao: new Acao("JBSS3", "x"), valor: 8.75, quantidade: 100, dataOperacao: parseDate('2017-08-25'), operacao: OperacaoEnum.COMPRA},
//  {id: 30, acao: new Acao("JBSS3", "x"), valor: 8.40, quantidade: 100, dataOperacao: parseDate('2017-09-08'), operacao: OperacaoEnum.VENDA},
//  {id: 31, acao: new Acao("JBSS3", "x"), valor: 7.60, quantidade: 100, dataOperacao: parseDate('2017-09-06'), operacao: OperacaoEnum.COMPRA},
//  {id: 32, acao: new Acao("JBSS3", "x"), valor: 8.40, quantidade: 100, dataOperacao: parseDate('2017-09-08'), operacao: OperacaoEnum.VENDA},
//  {id: 33, acao: new Acao("PTBL3", "x"), valor: 4.35, quantidade: 200, dataOperacao: parseDate('2017-09-05'), operacao: OperacaoEnum.COMPRA},
//  {id: 34, acao: new Acao("PTBL3", "x"), valor: 4.89, quantidade: 200, dataOperacao: parseDate('2017-09-08'), operacao: OperacaoEnum.VENDA},


  /* AÇÕES AINDA EM CUSTÓDIA*/

  // {id: 35, acao: new Acao("PDGR3"""), valor: 2.11, quantidade: 500, dataOperacao: parseDate('2017-08-29'), operacao: OperacaoEnum.COMPRA},
  // {id: 36, acao: new Acao("PDGR3"""), valor: 2.14, quantidade: 500, dataOperacao: parseDate('2017-09-30'), operacao: OperacaoEnum.VENDA},
  // {id: 37, acao: new Acao("PETR4"""), valor: 14.39, quantidade: 100, dataOperacao: parseDate('2017-09-05'), operacao: OperacaoEnum.COMPRA},
  // {id: 38, acao: new Acao("PETR4"""), valor: 14.71, quantidade: 100, dataOperacao: parseDate('2017-09-30'), operacao: OperacaoEnum.VENDA},
  // {id: 39, acao: new Acao("POSI3"""), valor: 3.53, quantidade: 200, dataOperacao: parseDate('2017-09-05'), operacao: OperacaoEnum.COMPRA},
  // {id: 40, acao: new Acao("POSI3"""), valor: 3.47, quantidade: 200, dataOperacao: parseDate('2017-09-30'), operacao: OperacaoEnum.VENDA},
  // {id: 41, acao: new Acao("RAPT4"""), valor: 6.75, quantidade: 200, dataOperacao: parseDate('2017-09-06'), operacao: OperacaoEnum.COMPRA},
  // {id: 42, acao: new Acao("RAPT4"""), valor: 7.11, quantidade: 200, dataOperacao: parseDate('2017-09-30'), operacao: OperacaoEnum.VENDA},
];
