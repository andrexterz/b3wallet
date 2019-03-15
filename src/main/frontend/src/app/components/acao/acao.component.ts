import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { AcaoService, EmpresaService, MensagemService } from '../../services';
import { Acao, Empresa, Option } from '../../models';

@Component({
  selector: 'acao-component',
  templateUrl: './acao.component.html'
})
export class AcaoComponent implements OnInit {

    selectedAcao: Acao = null;
    acoes: Acao[] = [];
    empresas: Empresa[] = [];
    optionsTipoPapel: Option[] = [];
    custodiaFilter: boolean = false;

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private acaoService: AcaoService,
      private empresaoService: EmpresaService,
      private mensagemService: MensagemService
      ) {
      }

    ngOnInit(): void {
      this.acaoService.list().subscribe(response => this.acoes = response.body.map(acao => Object.assign(new Acao(), acao)));
      this.empresaoService.list().subscribe(response => this.empresas = response.body.map(empresa => Object.assign(new Empresa(), empresa)));
      this.acaoService.listOptionsTipoPapel().subscribe(response => {
        this.optionsTipoPapel = response.body;
      });
      eval(localStorage.getItem('custodiaFilter')) ? this.custodiaFilter = eval(localStorage.getItem('custodiaFilter')): false;
    }

    list(): Object {
      return this.custodiaFilter ? this.acoes.filter(acao => acao.totalCustodia > 0): this.acoes;
    }

    add(): void {
      this.selectedAcao = new Acao();
    }

    edit(acao: Acao): void {
      this.selectedAcao = Object.assign({}, acao);
    }

    save(): void {
      if (this.selectedAcao) {
          this.acaoService.save(this.selectedAcao).subscribe(response => {
              let savedObj: Acao = Object.assign(new Acao(), response.body);
              let index = this.acoes.findIndex(o => o.id == savedObj.id);
              if (index >= 0) {
                  this.acoes[index] = savedObj;
              } else {
                  this.acoes.push(savedObj);
              }
              this.mensagemService.showMessage(savedObj.codigo, 'Ação salva com sucesso.', 'success');
          }, error => {
              this.mensagemService.showMessage('Erro ao salvar ação', error.message, 'error');
              console.log(error);
          });
      }
      this.close();
    }

    close(): void {
      this.selectedAcao = null;
    }

    filter(): void {
      this.custodiaFilter = !this.custodiaFilter;
      localStorage.setItem('custodiaFilter', this.custodiaFilter.toString());
    }

  //compare method for directive compareWith (mover para Utils.ts)
  comparator(itemA: any, itemB: any) {
    try {
      return itemA.id == itemB.id;
    } catch (e) {
      return false;
    }
  }
}
