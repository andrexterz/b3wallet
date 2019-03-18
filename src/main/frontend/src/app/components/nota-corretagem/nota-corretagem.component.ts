import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotaCorretagem } from '../../models';

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

  constructor() { }

  ngOnInit() {
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
