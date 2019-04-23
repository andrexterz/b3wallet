import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location, formatCurrency, getCurrencySymbol } from '@angular/common';
import * as moment from 'moment';
import { Papel, Provento, Option } from '../../models';
import { PapelService, ProventoService, MensagemService, Util } from '../../services';

@Component({
  selector: 'provento',
  templateUrl: './provento.component.html'
})
export class ProventoComponent implements OnInit {

  selectedProvento: Provento;
  proventos: Provento[] = [];
  papeis: Papel[] = [];
  selectedListItem: Set<string> = new Set();
  options: Option[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private proventoService: ProventoService,
    private papelService: PapelService,
    private mensagemService: MensagemService,
    private util: Util,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.papelService.list().subscribe(response => this.papeis = response.body.map(papel => Object.assign(new Papel(), papel)));
    this.proventoService.list()
    .subscribe(response => this.proventos = response.body.map(provento => Object.assign(new Provento(), provento)));
    this.proventoService.listOptions()
    .subscribe(response => this.options = response.body.map(option => Object.assign(new Option(), option)));
  }

  list(): Object {
    let obj: Object = new Object();
    this.proventos.forEach(provento => {
      let key = moment(provento.dataPagamento).format('MM/YYYY');
      if (obj.hasOwnProperty(key)) {
        obj[key].items.push(provento);
        obj[key].total += provento.valor;
      } else {
        obj[key] = {items: [provento], total: provento.valor};
      }
    });
    return obj;
  }

  add(): void {
    this.selectedProvento = new Provento();
    this.selectedProvento.valor = 0.01;
    this.selectedProvento.tipoProvento = this.options[0].value;
  }

  edit(provento: Provento): void {
    console.log(provento);
    this.selectedProvento = Object.assign(new Provento(), provento);
  }

  save(): void {
    if (this.selectedProvento) {
        this.proventoService.save(this.selectedProvento).subscribe(response => {
            const savedObj: Provento = Object.assign(new Provento(), response.body);
            const index = this.proventos.findIndex(o => o.id === savedObj.id);
            if (index >= 0) {
                this.proventos[index] = savedObj;
            } else {
                this.proventos.push(savedObj);
            }
            this.mensagemService.showMessage(savedObj.papel.codigo, 'Provento salvo com sucesso.', 'success');
        }, error => {
            this.mensagemService.showMessage('Erro ao salvar provento', error.message, 'error');
            console.log(error);
          });
    }
    this.close();
  }

  delete(provento: Provento): void {
    const valor = formatCurrency(provento.valor, this.locale, getCurrencySymbol('BRL', 'narrow', this.locale));
    const confirmDelete = confirm('Remover provento ' + provento.papel.codigo + ': ' + valor + '?');
    if (confirmDelete) {
      const index = this.proventos.findIndex(o => o.id === provento.id);
      this.proventoService.delete(provento).subscribe(response => {
        this.proventos.splice(index, 1);
        this.mensagemService
        .showMessage('Item removido', 'Provento de ' + provento.papel.codigo + ': ' + valor +  ' removido com sucesso.', 'success');
      }, error => {
        this.mensagemService.showMessage('Erro ao remover provento', error.message, 'error');
      });
    }
  }

  close(): void {
    this.selectedProvento = null;
  }

  expandListItem(item: string): void {
    if (this.selectedListItem.has(item)) {
      this.selectedListItem.delete(item);
    } else {
      this.selectedListItem.add(item);
    }
  }

  isExpanded(item: string):boolean {
    return this.selectedListItem.has(item);
  }
}
