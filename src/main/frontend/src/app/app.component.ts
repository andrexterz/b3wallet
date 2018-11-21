import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

    title = 'B3 Wallet';

    activeMenu = null;

    menuItems = [
        {title: "Início", route: "dashboard", icon: "fa fa-home"},
        {title: "Portfolio", route: "portfolio", icon: "fa fa-folder-open"},
        // {title: "Sincronizar", route: "#", icon: "fa fa-refresh"},
    ];

    selectMenu(menu: any) {
        this.activeMenu = menu;
    }
}
