import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OperacaoService, PapelService } from '../../services';
import { NotaCorretagem, Papel, Operacao, Option } from '../../models';
import { NgForm } from '@angular/forms';
import { NotaComponent } from '../nota/nota.component';

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
    private papelService: PapelService,
    private operacaoService: OperacaoService
  ) {}

  ngOnInit() {
    this.operacaoService.listOptionsTipoOperacao().subscribe(response => this.optionsTipoOperacao = response.body);
    this.papelService.list().subscribe(response => this.papeis = response.body);
    this.newOperacao();
  }

  save(form: NgForm): void {
    // console.log(form.invalid);
    console.log("implementar salvar");
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
    console.log('implementando edit:', operacao);
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
    console.log('implementar remove', operacao, ' --> index:', index);
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
