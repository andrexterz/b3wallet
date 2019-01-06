import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

    title = 'B3 Wallet';
    showMenuMobile = false;

    menuItems = [
        {title: "Início", route: "dashboard", icon: "fa fa-home"},
        {title: "Portfolio", route: "portfolio", icon: "fa fa-folder-open"},
        {title: "Análises", route: "analise", icon: "fa fa-sticky-note"},
    ];

    selectMenu(menu: any): void {
        this.showMenuMobile = false;
    }

    toggleMenuMobile(): void {
      this.showMenuMobile = !this.showMenuMobile;
    }
}
