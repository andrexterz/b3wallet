/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.controllers.models;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Min;

/**
 *
 * @author andre
 */

@Entity
public class Operacao extends Base {
    
    
    @ManyToOne
    private Acao acao;
   
    private Double valor;
    
    @Min(value = 1)
    private Integer quantidade;
    
    private Double custoOperacao;
    
    @Enumerated(EnumType.STRING)
    private TipoOperacao tipoOperacao;
    
    @Temporal(TemporalType.DATE)
    private Date dataOperacao;

    public Acao getAcao() {
        return acao;
    }

    public void setAcao(Acao acao) {
        this.acao = acao;
    }
    
    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Double getCustoOperacao() {
        return custoOperacao;
    }

    public void setCustoOperacao(Double custoOperacao) {
        //adicionar regras B3 e CAIXA
        this.custoOperacao = custoOperacao;
    }
    

    public TipoOperacao getTipoOperacao() {
        return tipoOperacao;
    }

    public void setTipoOperacao(TipoOperacao tipoOperacao) {
        this.tipoOperacao = tipoOperacao;
    }

    public Date getDataOperacao() {
        return dataOperacao;
    }

    public void setDataOperacao(Date dataOperacao) {
        this.dataOperacao = dataOperacao;
    }
    
    public Double getTotal() {
        return this.quantidade * this.valor;
    }
}
