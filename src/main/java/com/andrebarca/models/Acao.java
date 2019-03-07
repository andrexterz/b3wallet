package com.andrebarca.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/*
 * @author andre
 */


@Entity
public class Acao extends Base {

	private static final long serialVersionUID = 1L;

	public Acao() {
        this.operacoes = new HashSet<>();
    }

    public Acao(String codigo, Empresa empresa, Set<Operacao> operacoes) {
        this.codigo = codigo;
        this.empresa = empresa;
        this.operacoes = operacoes;
    }

    @Column(unique = true)
    private String codigo;

    @ManyToOne
    @JoinColumn(name = "EMPRESA_ID")
    private Empresa empresa;

    @OneToMany(mappedBy = "acao", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("acao")
    private Set<Operacao> operacoes;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Empresa getEmpresa() {
      return empresa;
    }

    public void setEmpresa(Empresa empresa) {
      this.empresa = empresa;
    }

    public Set<Operacao> getOperacoes() {
        return operacoes;
    }

    public void setOperacoes(Set<Operacao> operacoes) {
        operacoes.forEach((operacao) -> {
            operacao.setAcao(this);
        });
        this.operacoes = operacoes;
    }

    public void addOperacao(Operacao operacao) {
        this.operacoes.add(operacao);
    }

    @Transient
    public Double getTotalCompra() {
      return this.operacoes.stream().mapToDouble(operacao -> {
        return operacao.getTipoOperacao().equals(TipoOperacao.COMPRA) ? operacao.getValor() * operacao.getQuantidade(): 0;
      }).sum();
    }

    @Transient
    public Double getTotalVenda() {
      return this.operacoes.stream().mapToDouble(operacao -> {
        return operacao.getTipoOperacao().equals(TipoOperacao.VENDA) ? operacao.getValor() * operacao.getQuantidade(): 0;
      }).sum();
    }

    @Transient
    public Double getTotalLucro() {
      int totalQuantidade = this.operacoes.stream()
        .mapToInt(operacao -> {
          return operacao.getTipoOperacao().equals(TipoOperacao.VENDA) ? operacao.getQuantidade(): 0;
      }).sum();

      return this.getTotalVenda() - this.getPrecoMedio() * totalQuantidade;
    }

    @Transient
    public Double getPrecoMedio() {
      double totalCompra = 0;
      int totalQuantidade = 0;
      for (Operacao operacao: this.operacoes) {
        if (operacao.getTipoOperacao().equals(TipoOperacao.COMPRA)) {
          totalCompra += operacao.getTotalOperacao();
          totalQuantidade += operacao.getQuantidade();
        }
      }
      return totalQuantidade == 0 ? 0: totalCompra/totalQuantidade;
    }

    @Transient
    public Integer getTotalCustodia() {
      return this.operacoes.stream().mapToInt(operacao -> {
        return operacao.getTipoOperacao().equals(TipoOperacao.COMPRA) ? operacao.getQuantidade(): operacao.getQuantidade() * -1;
      }).sum();
    }
}
