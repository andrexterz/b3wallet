package com.andrebarca.models;

import java.io.Serializable;

public enum TipoProvento implements Serializable {
	DIVIDENDO("DIVIDENDO", "Dividendo"),
	JURO_SOBRE_CAPITAL_PROPRIO("JCP", "Juro sobre capital próprio"),
	RENDIMENTO("RENDIMENTO", "Rendimento");
	
	private final String tipo;
	private final String descricao;
	
	private TipoProvento(String tipo, String descricao) {
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
