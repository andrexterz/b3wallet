import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    title = 'B3 Wallet';
    showMenuMobile: boolean = false;

    menuItems = [
        {title: "Início", route: "dashboard", icon: "fa fa-home"},
        {title: "Portfolio", route: "portfolio", icon: "fa fa-folder-open"},
        {title: "Dividendos", route: "dividendo", icon: "fa fa-usd"},
        {title: "Análises", route: "analise", icon: "fa fa-sticky-note"},
    ];

    constructor () {}

    selectMenu(menu: any): void {
        this.showMenuMobile = false;
    }

    toggleMenuMobile(): void {
      this.showMenuMobile = !this.showMenuMobile;
    }
}
