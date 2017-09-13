import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { AcaoService } from './acao.service';
import { Acao } from "./acao";

@Component({
  selector: 'acao-component',
  templateUrl: './acao.component.html'
})
export class AcaoComponent implements OnInit {
    @Input()
    acao: Acao;

    constructor(private acaoService: AcaoService,
      private route: ActivatedRoute,
      private location: Location) {

      }

    ngOnInit(): void {
      this.route.paramMap.switchMap((params: ParamMap) => this.acaoService.getAcaoById(+params.get('id')))
         .subscribe(acao => this.acao = acao);
    }

    goBack(): void {
      this.location.back();
    }

}
