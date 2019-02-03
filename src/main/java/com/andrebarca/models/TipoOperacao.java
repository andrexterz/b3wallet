package com.andrebarca.models;

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
        return this.descricao;
    }
}
