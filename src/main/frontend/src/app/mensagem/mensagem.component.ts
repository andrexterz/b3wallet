import { Component, OnInit } from '@angular/core';
import { Mensagem } from '../models/mensagem';
import { MensagemService } from '../services/mensagem.service';

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
