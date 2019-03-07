import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Empresa } from "../../models";
import { EmpresaService, MensagemService } from '../../services';

@Component({
  selector: 'empresa',
  templateUrl: './empresa.component.html'
})
export class EmpresaComponent implements OnInit {

  selectedEmpresa: Empresa = null;
  empresas: Empresa[] = [];

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private location: Location,
    private mensagemService: MensagemService
  ) {
  }

  ngOnInit() {
    this.empresaService.list().subscribe(response => this.empresas = response.body.map(empresa => Object.assign(new Empresa(), empresa)));
  }

  list(): Object {
    console.log("implmementar");
    return this.empresas;
  }

  add(): void {
    console.log("implmementar");
  }

  edit(empresa: Empresa): void {
    this.selectedEmpresa = empresa;
  }

  save(): void {
    console.log("implmementar");
  }

  close(): void {
    this.selectedEmpresa = null;
  }
}
