import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OperacaoService, PapelService } from '../../services';
import { NotaCorretagem, Papel, Operacao, Option } from '../../models';

@Component({
  selector: 'nota-corretagem',
  templateUrl: './nota-corretagem.component.html',
  styleUrls: ['./nota-corretagem.component.css']
})
export class NotaCorretagemComponent implements OnInit {

  @Input()
  notaCorretagem: NotaCorretagem = null;

  @Output()
  notaCorretagemChange = new EventEmitter<NotaCorretagem>();

  papeis: Papel[] = [];
  operacoes: Operacao[] = [];
  optionsTipoOperacao: Option[] = [];
  selectedOperacao: Operacao = null;

  constructor
  (
    private papelService: PapelService,
    private operacaoService: OperacaoService
  ) {}

  ngOnInit() {
    this.operacaoService.listOptionsTipoOperacao().subscribe(response => this.optionsTipoOperacao = response.body);
    this.papelService.list().subscribe(response => this.papeis = response.body);
    this.newOperacao();
  }

  save(): void {
    console.log('implementar');
  }

  newOperacao(): void {
    this.selectedOperacao = new Operacao();
  }

  addEditOperacao(): void {
    // implementar se edit ou add
    this.operacoes.push(Object.assign(new Operacao(), this.selectedOperacao));
    this.selectedOperacao = null;
  }

  removeCancelOperacao(): void {
    this.selectedOperacao = null;
  }


  close(): void {
    this.notaCorretagem = null;
    this.notaCorretagemChange.emit(this.notaCorretagem);
  }

}
