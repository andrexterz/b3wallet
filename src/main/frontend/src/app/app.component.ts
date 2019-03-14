import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    title = 'B3 Wallet';
    showMenuMobile: boolean = false;

    menuItems = [
        {title: 'Início', route: 'dashboard', icon: 'fa fa-home'},
      { title: 'Papeis', route: 'acoes', icon: 'fa fa-puzzle-piece'},
        {title: 'Empresas', route: 'empresas', icon: 'fa fa-building'},
      { title: 'Operações', route: 'operacoes', icon: 'fa fa-exchange'},
        {title: 'Proventos', route: 'proventos', icon: 'fa fa-usd'},
        {title: 'Notas', route: 'notas', icon: 'fa fa-sticky-note'},
    ];

    constructor () {}

    selectMenu(menu: any): void {
        this.showMenuMobile = false;
    }

    toggleMenuMobile(): void {
      this.showMenuMobile = !this.showMenuMobile;
    }
}
