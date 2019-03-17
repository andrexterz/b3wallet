package com.andrebarca.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

/**
 *
 * @author andre
 */
@Entity
public class Nota extends Base {

    private static final long serialVersionUID = 1L;

    public Nota() {

    }

    public Nota(Empresa empresa, String anotacao) {
        this.empresa = empresa;
        this.anotacao = anotacao;
    }

    @ManyToOne
    @JoinColumn(name = "EMPRESA_ID")
    private Empresa empresa;

    @NotBlank
    @Column(length = 1000)
    private String anotacao;

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public String getAnotacao() {
        return anotacao;
    }

    public void setAnotacao(String anotacao) {
        this.anotacao = anotacao;
    }
}
