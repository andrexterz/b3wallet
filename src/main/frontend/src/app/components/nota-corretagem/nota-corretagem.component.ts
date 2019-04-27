import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotaCorretagemService, OperacaoService,PapelService } from '../../services';
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

  selectedOperacao: Operacao = null;
  editingOperacaoFlag: boolean;
  newOperacaoFlag: boolean;

  papeis: Papel[] = [];
  optionsTipoOperacao: Option[] = [];

  constructor (
    private notaCorretagemService: NotaCorretagemService,
    private operacaoService: OperacaoService,
    private papelService: PapelService
  ) {}

  ngOnInit() {
    this.operacaoService.listOptionsTipoOperacao().subscribe(response => this.optionsTipoOperacao = response.body);
    this.papelService.list().subscribe(response => this.papeis = response.body);
  }

  save(): void {
    this.notaCorretagemService.save(this.notaCorretagem).subscribe(response => {
      this.close();
    }, error => {
      console.log(error);
    });
  }

  newOperacao(): void {
    this.newOperacaoFlag = true;
    this.selectedOperacao = new Operacao();
  }

  confirmOperacao(): void {
    if (this.newOperacaoFlag) {
      this.notaCorretagem.operacoes.push(Object.assign(new Operacao(), this.selectedOperacao));
      this.selectedOperacao = null;
      this.newOperacaoFlag = false;
    }

    if (this.editingOperacaoFlag) {
      this.editingOperacaoFlag = false;
    }
  }

  editOperacao(operacao: Operacao): void {
    this.selectedOperacao = operacao;
    this.editingOperacaoFlag = true;
  }

  cancelOperacao(): void {
    if (this.notaCorretagem.operacoes.length > 0) {
      this.selectedOperacao = null;
      this.newOperacaoFlag = false;
    }
  }

  removeOperacao(operacao: Operacao): void {
    const index = this.notaCorretagem.operacoes.findIndex(op => op == operacao);
    if (index !== undefined && this.isOperacaoRemovable()) {
      this.notaCorretagem.operacoes.splice(index, 1);
    }
  }

  isNew(): boolean {
    return this.newOperacaoFlag;
  }

  isEditing(): boolean {
    return this.editingOperacaoFlag;
  }

  isOperacaoRemovable(): boolean {
    return this.notaCorretagem.operacoes.length > 1;
  }

  selectedOperacaoModelValid(): boolean {
    if (this.selectedOperacao != null) {
      return this.selectedOperacao.papel != null &&
      this.selectedOperacao.valor !== 0
      && this.selectedOperacao.quantidade !== 0;
    }
    return false;
  }

  close(): void {
    this.notaCorretagem = null;
    this.notaCorretagemChange.emit(this.notaCorretagem);
  }
}
