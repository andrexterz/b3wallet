package com.andrebarca.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/*
 * @author andre
 */

@Entity
public class Empresa extends Base {

    public Empresa() {
        this.acoes = new HashSet<>();
    }

    private String nome;

    private String cnpj;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("empresa")
    private Set<Acao> acoes;    

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

    public Set<Acao> getAcoes() {
        return acoes;
    }

    public void setAcoes(Set<Acao> acoes) {
        acoes.forEach((acao) -> {
            acao.setEmpresa(this);
        });

        this.acoes = acoes;
    }
}