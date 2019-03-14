package com.andrebarca.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 *
 * @author andre
 */

@Entity
public class Operacao extends Base {
    
	private static final long serialVersionUID = 1L;

	public Operacao() {
        this.acao = null;
      this.valor = 0.0;
      this.quantidade = 0;
      this.custoOperacao = 0.0;
      this.tipoOperacao = null;
      this.dataOperacao = null;
    }
    
    public Operacao(Acao acao, Double valor, Integer quantidade, Double custoOperacao, TipoOperacao tipoOperacao, Date dataOperacao) {
        this.acao = acao;
        this.valor = valor;
        this.quantidade = quantidade;
        this.custoOperacao = custoOperacao;
        this.tipoOperacao = tipoOperacao;
        this.dataOperacao = dataOperacao;
    }
    
    
    @ManyToOne
    @JoinColumn(name = "ACAO_ID")
    @JsonIgnoreProperties({"operacoes", "empresa"})
    private Acao acao;

    private Double valor;

    @Min(value = 1)
    private Integer quantidade;

    private Double custoOperacao;

    @Enumerated(EnumType.STRING)
    private TipoOperacao tipoOperacao;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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

    @Transient
    public Double getTotalOperacao() {
        return this.quantidade * this.valor + this.custoOperacao;
    }
}
