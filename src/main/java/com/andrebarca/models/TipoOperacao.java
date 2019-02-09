package com.andrebarca.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author andre
 */
public enum TipoOperacao implements Serializable {

    COMPRA ("COMPRA", "Compra"),
    VENDA ("VENDA", "Venda");

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

    public static List<Map<String, String>> getPropertyList() {
    	List<Map<String, String>> tipos = new ArrayList<>();
    	Arrays.stream(TipoOperacao.values()).forEach(tipo -> {
    		Map<String, String> tipoMap = new HashMap<String, String>();
    		tipoMap.put("value", tipo.getTipo());
    		tipoMap.put("description", tipo.getDescricao());
        tipos.add(tipoMap);
    	});
    	return tipos;
    }
}
