/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;


/**
 *
 * @author andre
 */
@Entity
public class Analise extends Base {
    
    public Analise() {
    
    }
    
    public Analise(Acao acao, String anotacao) {
        this.acao = acao;
        this.anotacao = anotacao;
    }

    @ManyToOne
    @JoinColumn(name = "ACAO_ID")
    @JsonIgnoreProperties("operacoes")
    private Acao acao;
    
    @NotBlank
    private String anotacao;

    public Acao getAcao() {
        return acao;
    }

    public void setAcao(Acao acao) {
        this.acao = acao;
    }

    public String getAnotacao() {
        return anotacao;
    }

    public void setAnotacao(String anotacao) {
        this.anotacao = anotacao;
    }
}
