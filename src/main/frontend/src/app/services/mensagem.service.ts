import { Injectable } from '@angular/core';
import { Mensagem } from '../models/mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
  mensagem: Mensagem = {titulo: '', texto: '', status: 'dismissed'};
  defaultTimeout: number = 2500;

  constructor() {
  }

  getMensagem(): Mensagem {
    return this.mensagem;
  }

  setMensagem(mensagem: Mensagem): void {
    this.mensagem = mensagem;
  }

  showMessage(titulo: string, texto: string, status: string = 'info'): void {
    this.mensagem.titulo = titulo;
    this.mensagem.texto = texto;
    this.mensagem.status = status;

    setTimeout(() => {
      this.mensagem.status = 'dismissed';
    }, this.defaultTimeout);
  }

  getDefaultTimeout(): number {
    return this.defaultTimeout;
  }

  setDefaultTimeout(timeout: number): void {
    this.defaultTimeout = timeout;
  }
}
