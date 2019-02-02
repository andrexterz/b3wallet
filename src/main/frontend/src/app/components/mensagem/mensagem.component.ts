import { Component, OnInit } from '@angular/core';
import { Mensagem } from '../../models';
import { MensagemService } from '../../services';

@Component({
  selector: 'mensagem-component',
  templateUrl: './mensagem.component.html'
})
export class MensagemComponent implements OnInit {
  mensagem: Mensagem;

  constructor(private mensagemService: MensagemService) {
    this.mensagem = this.mensagemService.getMensagem();
  }

  ngOnInit() {
    console.log("mensagem component started.");
  }
}
