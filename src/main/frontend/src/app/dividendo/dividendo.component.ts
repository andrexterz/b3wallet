import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Acao } from '../models/acao';
import { AcaoService } from '../services/acao.service';
import { Dividendo } from '../models/dividendo';
import { DividendoService } from '../services/dividendo.service';
import { MensagemService } from '../services/mensagem.service';
import * as moment from 'moment';

@Component({
  selector: 'dividendo',
  templateUrl: './dividendo.component.html'
})
export class DividendoComponent implements OnInit {

  selectedDividendo: Dividendo;
  dividendos: Dividendo[] = [];
  acoes: Acao[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dividendoService: DividendoService,
    private acaoService: AcaoService,
    private mensagemService: MensagemService
  ) { }

  ngOnInit() {
    this.acaoService.list().subscribe(response => this.acoes = response.body.map(acao => Object.assign(new Acao(), acao)));
    this.dividendoService.list().subscribe(response => this.dividendos = response.body.map(dividendo => Object.assign(new Dividendo(), dividendo)));
  }

  list(): Object {
    let obj: Object = new Object();
    this.dividendos.forEach(dividendo => {
      let key = moment(dividendo.dataPagamento).format("MM/YYYY");
      if (obj.hasOwnProperty(key)) {
        obj[key].push(dividendo);
      } else {
        obj[key] = [dividendo];
      }
    });
    return obj;
  }

  add(): void {
    this.selectedDividendo = new Dividendo();
    this.selectedDividendo.valor = 0.01;
  }

  edit(dividendo: Dividendo): void {
    this.selectedDividendo = Object.assign(new Dividendo(), dividendo);
  }

  save(): void {
    console.log("to implement save: ", this.selectedDividendo);
    if (this.selectedDividendo) {
        this.dividendoService.save(this.selectedDividendo).subscribe(response => {
            let savedObj: Dividendo = Object.assign(new Dividendo(), response.body);
            let index = this.dividendos.findIndex(o => o.id == savedObj.id);
            if (index >= 0) {
                this.dividendos[index] = savedObj;
            } else {
                this.dividendos.push(savedObj);
            }
            this.mensagemService.showMessage(savedObj.acao.codigo, "Dividendo salvo com sucesso.", "success");
        }, error => {
            this.mensagemService.showMessage("Erro ao salvar dividendo", error.message, "error");
            console.log(error);
          });
    }
    this.close();
  }

  delete(dividendo: Dividendo): void {
    console.log("to implement delete: ", dividendo);
  }

  close(): void {
    this.selectedDividendo = null;
  }

  //compare method for directive compareWith
  comparator(itemA: any, itemB: any): boolean {
    try {
      return itemA.id == itemB.id;
    } catch (e) {
      return false;
    }
  }

}
