package com.andrebarca.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author andre
 */

@Entity
public class Dividendo extends Base {

    public Dividendo() {
    }

    public Dividendo(Acao acao, Double valor, Date dataEx, Date dataPagamento) {
        this.acao = acao;
        this.valor = valor;
        this.dataEx = dataEx;
        this.dataPagamento = dataPagamento;
    }


    @ManyToOne
    @JoinColumn(name = "ACAO_ID")
    @JsonIgnoreProperties("operacoes")
    private Acao acao;

    private Double valor;

    @Temporal(TemporalType.DATE)
    private Date dataEx;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dataPagamento;

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

    public Date getDataEx() {
        return dataEx;
    }

    public void setDataEx(Date dataEx) {
        this.dataEx = dataEx;
    }

    public Date getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(Date dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

}
