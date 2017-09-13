/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.controllers.models;

import java.io.Serializable;

/**
 *
 * @author andre
 */
public enum TipoOperacao implements Serializable {
    
    COMPRA ("c", "Compra"),
    VENDA ("v", "Venda");
    
    private final String tipo;
    private final String descricao;
    
    private TipoOperacao(String tipo, String descricao) {
        this.tipo = tipo;
        this.descricao = descricao;
    }
    
    public String getTipo() {
        return this.tipo;
    }
    
    public String getDescricao() {
        return this.tipo;
    }
}
