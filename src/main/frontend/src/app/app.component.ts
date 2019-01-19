import { Component } from '@angular/core';
import { MensagemService } from './mensagem/mensagem.service';
import { Mensagem } from './mensagem/mensagem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

    title = 'B3 Wallet';
    showMenuMobile: boolean = false;

    menuItems = [
        {title: "Início", route: "dashboard", icon: "fa fa-home"},
        {title: "Portfolio", route: "portfolio", icon: "fa fa-folder-open"},
        {title: "Análises", route: "analise", icon: "fa fa-sticky-note"},
    ];

    constructor (private mensagemService: MensagemService) {}

    selectMenu(menu: any): void {
        this.showMenuMobile = false;
    }

    toggleMenuMobile(): void {
      this.showMenuMobile = !this.showMenuMobile;
    }

    teste(): void {
      this.mensagemService.showMessage("test app", "body message app", "warning");
    }
}
