package com.andrebarca.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/*
 * @author andre
 */

@Entity
public class Empresa extends Base {

  	private static final long serialVersionUID = 1L;

	public Empresa() {
    }

    public Empresa(String nome, String cnpj, TipoPapel tipoPapel) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.tipoPapel = tipoPapel;
    }

    private String nome;
    
    @Column(unique = true)
    private String cnpj;

    @Enumerated(EnumType.STRING)
    private TipoPapel tipoPapel;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public TipoPapel getTipoPapel() {
        return tipoPapel;
    }

    public void setTipoPapel(TipoPapel tipoPapel) {
        this.tipoPapel = tipoPapel;
    }    
}