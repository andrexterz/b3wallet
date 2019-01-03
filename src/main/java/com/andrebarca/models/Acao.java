package com.andrebarca.models;

 /*
 * @author andre
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class Acao extends Base {

    public Acao() {
        this.operacoes = new HashSet<>();
    }

    public Acao(String codigo, String nome,Set<Operacao> operacoes) {
        this.codigo = codigo;
        this.nome = nome;
        this.operacoes = operacoes;
    }

    @Column(unique = true)
    private String codigo;

    private String nome;

    @OneToMany(mappedBy = "acao", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("acao")
    private Set<Operacao> operacoes;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


    public Set<Operacao> getOperacoes() {
        return operacoes;
    }

    public void setOperacoes(Set<Operacao> operacaos) {
        operacaos.forEach((operacao) -> {
            operacao.setAcao(this);
        });
        this.operacoes = operacaos;
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
