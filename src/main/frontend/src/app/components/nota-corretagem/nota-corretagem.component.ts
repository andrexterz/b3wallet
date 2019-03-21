import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OperacaoService } from '../../services';
import { NotaCorretagem, Operacao, Option } from '../../models';

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

  operacoes: Operacao[] = [];
  optionsTipoOperacao: Option[] = [];

  constructor
  (
    private operacaoService: OperacaoService
  ) {}

  ngOnInit() {
    this.operacaoService.listOptionsTipoOperacao().subscribe(response => {
      this.optionsTipoOperacao = response.body;
    });
    this.operacoes.push(new Operacao());
  }

  save(): void {
    console.log('implementar');
  }

  close(): void {
    console.log('closed?');
    this.notaCorretagem = null;
    this.notaCorretagemChange.emit(this.notaCorretagem);
  }

}
