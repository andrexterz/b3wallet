import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

    title = 'B3 Wallet';
    showMenuMobile: boolean = false;
    message: Message = {title: '', text: '', status: ''};

    menuItems = [
        {title: "Início", route: "dashboard", icon: "fa fa-home"},
        {title: "Portfolio", route: "portfolio", icon: "fa fa-folder-open"},
        {title: "Análises", route: "analise", icon: "fa fa-sticky-note"},
    ];

    constructor (private messageService: MessageService) {}

    selectMenu(menu: any): void {
        this.showMenuMobile = false;
    }

    toggleMenuMobile(): void {
      this.showMenuMobile = !this.showMenuMobile;
    }

    showMessage(): void {
      this.messageService.showAlert();
      this.message = this.messageService.getMessage();
    }
}
