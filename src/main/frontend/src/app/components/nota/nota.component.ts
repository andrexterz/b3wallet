import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Nota, Acao } from '../../models';
import { AcaoService, NotaService, MensagemService } from '../../services';

@Component({
  selector: 'nota-component',
  templateUrl: './nota.component.html'
})
export class NotaComponent implements OnInit {
    acoes: Acao[] = [];
    notas: Nota[] = [];
    selectedNota: Nota = null;
    selectedListItem: Set<number> = new Set();

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private notaService: NotaService,
      private acaoService: AcaoService,
      private mensagemService: MensagemService
    ) {}

    ngOnInit(): void {
      this.acaoService.list().subscribe(response => this.acoes = response.body.map(acao => Object.assign(new Acao(), acao)));
      this.notaService.list().subscribe(response => this.notas = response.body.map(nota => Object.assign(new Nota(), nota)));
    }

    list(): Object {
      let obj: Object = new Object();
      this.notas.forEach(nota => {
        if (obj.hasOwnProperty(nota.acao.codigo)) {
          obj[nota.acao.codigo].push(nota);
        } else {
            obj[nota.acao.codigo] = [nota];
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
          let savedObj: Nota = Object.assign(new Nota(), response.body);
          let index  = this.notas.findIndex(o => o.id == savedObj.id);
          if (index >= 0) {
            this.notas[index] = savedObj;
          } else {
            this.notas.push(savedObj);
          }
          this.mensagemService.showMessage(savedObj.acao.codigo, "Anotação salva com sucesso.", "success");
        }, error => {
          this.mensagemService.showMessage("Erro ao salvar nota", error.message, "error");
          console.log(error);
        });
      }
      this.close();
    }

    delete(nota: Nota): void {
      let confirmDelete = confirm("Remover nota " + nota.acao.codigo + ": " + (nota.anotacao.length <= 10 ? nota.anotacao: nota.anotacao.slice(0, 10).trim()) + "...?");
      if (confirmDelete) {
        let index = this.notas.findIndex(o => o.id == nota.id);
        this.notaService.delete(nota).subscribe(response => {
            this.notas.splice(index, 1);
            this.mensagemService.showMessage("Anotação de " + nota.acao.codigo, (nota.anotacao.length <= 10 ? nota.anotacao: nota.anotacao.slice(0, 10).trim()) + " removida com sucesso.", "success");
        }, error => {
            this.mensagemService.showMessage("Erro ao remover nota", error.message, "error");
        });
      }
    }

    close(): void {
        this.selectedNota = null;
     }

    //compare method for directive compareWith
    comparator(itemA: any, itemB: any): boolean {
        try {
            return itemA.id == itemB.id;
        } catch (e) {
            return false;
        }
    }

    expandListItem(index: number): void {
      if (this.selectedListItem.has(index)) {
        this.selectedListItem.delete(index);
      } else {
        this.selectedListItem.add(index);
      }
    }

    isExpanded(index: number):boolean {
      return this.selectedListItem.has(index);
    }
}
