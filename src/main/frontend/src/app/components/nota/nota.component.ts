import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Nota, Empresa } from '../../models';
import { EmpresaService, NotaService, MensagemService, Util } from '../../services';

@Component({
  selector: 'nota-component',
  templateUrl: './nota.component.html'
})
export class NotaComponent implements OnInit {
    empresas: Empresa[] = [];
    notas: Nota[] = [];
    selectedNota: Nota = null;
    selectedListItem: Set<string> = new Set();

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private util: Util,
      private notaService: NotaService,
      private empresaService: EmpresaService,
      private mensagemService: MensagemService
    ) {}

    ngOnInit(): void {
      this.empresaService.list().subscribe(response => this.empresas = response.body.map(empresa => Object.assign(new Empresa(), empresa)));
      this.notaService.list().subscribe(response => this.notas = response.body.map(nota => Object.assign(new Nota(), nota)));
    }

    list(): Object {
      let obj: Object = new Object();
      this.notas.forEach(nota => {
        if (obj.hasOwnProperty(nota.empresa.nome)) {
          obj[nota.empresa.nome].push(nota);
        } else {
            obj[nota.empresa.nome] = [nota];
        }
      });
      return obj;
    }

    add(): void {
        this.selectedNota = new Nota();
    }

    edit(nota: Nota): void {
      this.selectedNota = Object.assign(new Nota(), nota);
    }

    save(): void {
      if (this.selectedNota) {
        this.notaService.save(this.selectedNota).subscribe(response => {
          const savedObj: Nota = Object.assign(new Nota(), response.body);
          let index  = this.notas.findIndex(o => o.id == savedObj.id);
          if (index >= 0) {
            this.notas[index] = savedObj;
          } else {
            this.notas.push(savedObj);
          }
          this.mensagemService.showMessage(savedObj.empresa.nome, 'Anotação salva com sucesso.', 'success');
        }, error => {
          this.mensagemService.showMessage('Erro ao salvar nota', error.message, 'error');
          console.log(error);
        });
      }
      this.close();
    }

    delete(nota: Nota): void {
      const confirmDelete = confirm('Remover nota ' + nota.empresa.nome + ': ' +
      (nota.anotacao.length <= 10 ? nota.anotacao : nota.anotacao.slice(0, 10).trim()) + '...?');
      if (confirmDelete) {
        const index = this.notas.findIndex(o => o.id === nota.id);
        this.notaService.delete(nota).subscribe(response => {
            this.notas.splice(index, 1);
            this.mensagemService.showMessage('Anotação de ' +
            nota.empresa.nome, (nota.anotacao.length <= 10 ?
            nota.anotacao : nota.anotacao.slice(0, 10).trim()) + ' removida com sucesso.', 'success');
        }, error => {
            this.mensagemService.showMessage('Erro ao remover nota', error.message, 'error');
        });
      }
    }

    close(): void {
        this.selectedNota = null;
     }

    expandListItem(item: string): void {
      if (this.selectedListItem.has(item)) {
        this.selectedListItem.delete(item);
      } else {
        this.selectedListItem.add(item);
      }
    }

    isExpanded(item: string):boolean {
      return this.selectedListItem.has(item);
    }
}
