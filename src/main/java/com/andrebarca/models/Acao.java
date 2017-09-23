/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.models;

 /*
 * @author andre
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

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
}
