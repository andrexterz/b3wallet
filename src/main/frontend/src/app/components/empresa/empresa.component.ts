import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Empresa, Option } from '../../models';
import { EmpresaService, MensagemService } from '../../services';

@Component({
  selector: 'empresa-component',
  templateUrl: './empresa.component.html'
})
export class EmpresaComponent implements OnInit {

  selectedEmpresa: Empresa = null;
  empresas: Empresa[] = [];
  optionsTipoPapel: Option[] = [];

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private location: Location,
    private mensagemService: MensagemService
  ) {
  }

  ngOnInit() {
    this.empresaService.list().subscribe(response => this.empresas = response.body.map(empresa => Object.assign(new Empresa(), empresa)));
    this.empresaService.listOptionsTipoPapel().subscribe(response => {
      this.optionsTipoPapel = response.body;
    });
  }

  getTipoPapelDescritipion(value: string): string {
    const option = this.optionsTipoPapel.find(opt => opt.value === value);
    return option ? option.description : null;
  }

  list(): Object {
    return this.empresas;
  }

  add(): void {
    this.selectedEmpresa = new Empresa();
  }

  edit(empresa: Empresa): void {
    this.selectedEmpresa = empresa;
  }

  save(): void {
    if (this.selectedEmpresa) {
      this.empresaService.save(this.selectedEmpresa).subscribe(response => {
        let savedObj: Empresa = Object.assign(new Empresa(), response.body);
        let index = this.empresas.findIndex(o => o.id == savedObj.id);
        if (index >= 0) {
          this.empresas[index] = savedObj;
        } else {
          this.empresas.push(savedObj);
        }
        this.mensagemService.showMessage(savedObj.nome, 'Empresa salva com sucesso.', 'success');
      }, error => {
        this.mensagemService.showMessage('Erro ao salvar empresa', error.message, 'error');
        console.log(error);
      });
    }
    this.close();
  }

  close(): void {
    this.selectedEmpresa = null;
  }
}
