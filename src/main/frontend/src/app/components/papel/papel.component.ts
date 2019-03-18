import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { PapelService, EmpresaService, MensagemService } from '../../services';
import { Papel, Empresa } from '../../models';

@Component({
  selector: 'papel-component',
  templateUrl: './papel.component.html'
})
export class PapelComponent implements OnInit {

    selectedPapel: Papel = null;
    papeis: Papel[] = [];
    empresas: Empresa[] = [];
    custodiaFilter: boolean = false;

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private papelService: PapelService,
      private empresaoService: EmpresaService,
      private mensagemService: MensagemService
      ) {
      }

    ngOnInit(): void {
      this.papelService.list().subscribe(response => this.papeis = response.body.map(papel => Object.assign(new Papel(), papel)));
      this.empresaoService.list().subscribe(response => this.empresas = response.body.map(empresa => Object.assign(new Empresa(), empresa)));
      eval(localStorage.getItem('custodiaFilter')) ? this.custodiaFilter = eval(localStorage.getItem('custodiaFilter')): false;
    }

    list(): Object {
      return this.custodiaFilter ? this.papeis.filter(papel => papel.totalCustodia > 0): this.papeis;
    }

    add(): void {
      this.selectedPapel = new Papel();
    }

    edit(papel: Papel): void {
      this.selectedPapel = Object.assign({}, papel);
    }

    save(): void {
      if (this.selectedPapel) {
        // delete
        console.log(this.selectedPapel);
        // fim delete
        this.papelService.save(this.selectedPapel).subscribe(response => {
            let savedObj: Papel = Object.assign(new Papel(), response.body);
            let index = this.papeis.findIndex(o => o.id == savedObj.id);
            if (index >= 0) {
                this.papeis[index] = savedObj;
            } else {
                this.papeis.push(savedObj);
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
      this.selectedPapel = null;
    }

    filter(): void {
      this.custodiaFilter = !this.custodiaFilter;
      localStorage.setItem('custodiaFilter', this.custodiaFilter.toString());
    }

  // compare method for directive compareWith (mover para Util.ts)
  comparator(itemA: any, itemB: any) {
    try {
      return itemA.id == itemB.id;
    } catch (e) {
      return false;
    }
  }
}
