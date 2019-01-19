import { Component, OnInit } from '@angular/core';
import { Mensagem } from './mensagem';
import { MensagemService } from './mensagem.service';

@Component({
  selector: 'mensagem',
  templateUrl: './mensagem.component.html'
})
export class MensagemComponent implements OnInit {
  mensagem: Mensagem = {titulo: '', texto: '', status: 'dismissed'};

  constructor(private mensagemService: MensagemService) {
    this.mensagemService.setMensagem(this.mensagem);
  }

  ngOnInit() {
    console.log("mensagem component started.");
  }
}
