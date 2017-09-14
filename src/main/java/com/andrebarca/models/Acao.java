/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.models;

 /*
 * @author andre
 */

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class Acao extends Base {

    public Acao() {
        this.operacaos = new ArrayList<>();
    }
    
    public Acao(String codigo, String nome, List<Operacao> operacoes) {
        this.codigo = codigo;
        this.nome = nome;
        this.operacaos = operacoes;
    }
    
    private String codigo;
    
    private String nome;
    
    @OneToMany(mappedBy = "acao", cascade = CascadeType.ALL)
    private List<Operacao> operacaos;

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
    

    public List<Operacao> getOperacaos() {
        return operacaos;
    }

    public void setOperacaos(List<Operacao> operacaos) {
        operacaos.forEach((operacao) -> {
            operacao.setAcao(this);
        });
        this.operacaos = operacaos;
    }    
    
    public void addOperacao(Operacao operacao) {
        this.operacaos.add(operacao);
    }
}
