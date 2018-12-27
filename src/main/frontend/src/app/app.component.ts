import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

    title = 'B3 Wallet';

    activeMenu = null;

    menuItems = [
        {title: "Início", route: "dashboard", icon: "fa fa-home"},
        {title: "Portfolio", route: "portfolio", icon: "fa fa-folder-open"},
         {title: "Análises", route: "analise", icon: "fa fa-sticky-note"},
    ];
    
  ngOnInit(): void {
        this.activeMenu = this.menuItems[0];
    }    

    selectMenu(menu: any) {
        this.activeMenu = menu;
    }
}
