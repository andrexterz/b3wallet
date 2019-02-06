import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, formatCurrency, getCurrencySymbol } from '@angular/common';
import { Acao, Provento, Option } from '../../models';
import { AcaoService, ProventoService, MensagemService } from '../../services';
import * as moment from 'moment';

@Component({
  selector: 'provento',
  templateUrl: './provento.component.html'
})
export class ProventoComponent implements OnInit {

  selectedProvento: Provento;
  proventos: Provento[] = [];
  acoes: Acao[] = [];
  selectedListItem: Set<number> = new Set();
  options: Option[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private proventoService: ProventoService,
    private acaoService: AcaoService,
    private mensagemService: MensagemService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.acaoService.list().subscribe(response => this.acoes = response.body.map(acao => Object.assign(new Acao(), acao)));
    this.proventoService.list().subscribe(response => this.proventos = response.body.map(provento => Object.assign(new Provento(), provento)));
    this.proventoService.listOptions().subscribe(response => this.options = response.body.map(option => Object.assign(new Option(), option)));
  }

  list(): Object {
    let obj: Object = new Object();
    this.proventos.forEach(provento => {
      let key = moment(provento.dataPagamento).format("MM/YYYY");
      if (obj.hasOwnProperty(key)) {
        obj[key].items.push(provento);
        obj[key].total += provento.valor;
      } else {
        obj[key] = {"items": [provento], "total": provento.valor};
      }
    });
    return obj;
  }

  add(): void {
    this.selectedProvento = new Provento();
    this.selectedProvento.valor = 0.01;
    let option: Option = this.options[0];
    this.selectedProvento.tipoProvento = option.tipo;
  }

  edit(provento: Provento): void {
    console.log(provento);
    this.selectedProvento = Object.assign(new Provento(), provento);
  }

  save(): void {
    if (this.selectedProvento) {
        this.proventoService.save(this.selectedProvento).subscribe(response => {
            let savedObj: Provento = Object.assign(new Provento(), response.body);
            let index = this.proventos.findIndex(o => o.id == savedObj.id);
            if (index >= 0) {
                this.proventos[index] = savedObj;
            } else {
                this.proventos.push(savedObj);
            }
            this.mensagemService.showMessage(savedObj.acao.codigo, "Provento salvo com sucesso.", "success");
        }, error => {
            this.mensagemService.showMessage("Erro ao salvar provento", error.message, "error");
            console.log(error);
          });
    }
    this.close();
  }

  delete(provento: Provento): void {
    let valor = formatCurrency(provento.valor, this.locale, getCurrencySymbol('BRL', 'narrow', this.locale));
    let confirmDelete = confirm("Remover provento " + provento.acao.codigo + ": " + valor + "?");
    if (confirmDelete) {
      let index = this.proventos.findIndex(o => o.id == provento.id);
      this.proventoService.delete(provento).subscribe(response => {
        this.proventos.splice(index, 1);
        this.mensagemService.showMessage("Item removido", "Provento de " + provento.acao.codigo + ": " + valor +  " removido com sucesso.", "success");
      }, error => {
        this.mensagemService.showMessage("Erro ao remover provento", error.message, "error");
      });
    }
  }

  close(): void {
    this.selectedProvento = null;
  }

  //compare method for directive compareWith
  comparator(itemA: any, itemB: any): boolean {
    try {
      return itemA.id == itemB.id;
    } catch (e) {
      return false;
    }
  }

  expandListItem(index: number): void {
    if (this.selectedListItem.has(index)) {
      this.selectedListItem.delete(index);
    } else {
      this.selectedListItem.add(index);
    }
  }

  isExpanded(index: number):boolean {
    return this.selectedListItem.has(index);
  }
}
