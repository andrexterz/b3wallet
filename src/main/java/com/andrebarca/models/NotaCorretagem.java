package com.andrebarca.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
public class NotaCorretagem extends Base {

    public NotaCorretagem() {

    }

    public NotaCorretagem(
        Long numero,
        Date dataPregao,
        Set<Operacao> operacoes,
        Double taxaLiquidacao,
        Double taxaRegistro,
        Double taxaTermo,
        Double taxaAna,
        Double emolumentos,
        Double corregatem,
        Double iss,
        Double irrf,
        Double outrasDespesas        
    ) {
        this.numero = numero;
        this.dataPregao = dataPregao;
        this.operacoes = operacoes;
        this.taxaLiquidacao = taxaLiquidacao;
        this.taxaRegistro = taxaRegistro;
        this.taxaTermo = taxaTermo;
        this.taxaAna = taxaAna;
        this.emolumentos = emolumentos;
        this.corregatem = corregatem;
        this.iss = iss;
        this.irrf = irrf;
        this.outrasDespesas = outrasDespesas;
    }



    private static final long serialVersionUID = 1L;

    private Long numero;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")    
    private Date dataPregao;

    @OneToMany(mappedBy = "notaCorretagem", orphanRemoval = true)
    @JsonIgnoreProperties({ "notaCorretagem" })
    private Set<Operacao> operacoes;

    private Double taxaLiquidacao;

    private Double taxaRegistro;

    private Double taxaTermo;

    private Double taxaAna;

    private Double emolumentos;

    private Double corregatem;

    private Double iss;

    private Double irrf;

    private Double outrasDespesas;

    public Long getNumero() {
        return numero;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public Date getDataPregao() {
        return dataPregao;
    }

    public void setDataPregao(Date dataPregao) {
        this.dataPregao = dataPregao;
    }

    public void addOperacao(Operacao operacao) {
        operacao.setNotaCorretagem(this);
        this.operacoes.add(operacao);
    }

    public Set<Operacao> getOperacoes() {
        return operacoes;
    }

    public void setOperacoes(Set<Operacao> operacoes) {
        operacoes.forEach(op -> {
            op.setNotaCorretagem(this);
        });
        this.operacoes = operacoes;
    }

    public Double getTaxaLiquidacao() {
        return taxaLiquidacao;
    }

    public void setTaxaLiquidacao(Double taxaLiquidacao) {
        this.taxaLiquidacao = taxaLiquidacao;
    }

    public Double getTaxaRegistro() {
        return taxaRegistro;
    }

    public void setTaxaRegistro(Double taxaRegistro) {
        this.taxaRegistro = taxaRegistro;
    }

    public Double getTaxaTermo() {
        return taxaTermo;
    }

    public void setTaxaTermo(Double taxaTermo) {
        this.taxaTermo = taxaTermo;
    }

    public Double getTaxaAna() {
        return taxaAna;
    }

    public void setTaxaAna(Double taxaAna) {
        this.taxaAna = taxaAna;
    }

    public Double getEmolumentos() {
        return emolumentos;
    }

    public void setEmolumentos(Double emolumentos) {
        this.emolumentos = emolumentos;
    }

    /**
     * @return the corregatem
     */
    public Double getCorregatem() {
        return corregatem;
    }

    public void setCorregatem(Double corregatem) {
        this.corregatem = corregatem;
    }

    public Double getIss() {
        return iss;
    }

    public void setIss(Double iss) {
        this.iss = iss;
    }

    public Double getIrrf() {
        return irrf;
    }

    public void setIrrf(Double irrf) {
        this.irrf = irrf;
    }

    public Double getOutrasDespesas() {
        return outrasDespesas;
    }

    public void setOutrasDespesas(Double outrasDespesas) {
        this.outrasDespesas = outrasDespesas;
    }
}