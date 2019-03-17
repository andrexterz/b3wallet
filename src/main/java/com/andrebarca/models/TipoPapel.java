package com.andrebarca.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum TipoPapel implements Serializable {
    ACAO("ACAO", "Ação"),
    FUNDO_INVESTIMENTO_IMOBILIARIO("FUNDO_INVESTIMENTO_IMOBILIARIO", "Fundo de Investimento Imobiliário");

    private final String tipo;
    private final String descricao;

    private TipoPapel(String tipo, String descricao) {
        this.tipo = tipo;
        this.descricao = descricao;
    }

    public String getTipo() {
        return tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public static List<Map<String, String>> getPropertyList() {
        List<Map<String, String>> tipos = new ArrayList<>();
        Arrays.stream(TipoPapel.values()).forEach(tipo -> {
            Map<String, String> tipoMap = new HashMap<String, String>();
            tipoMap.put("value", tipo.getTipo());
            tipoMap.put("description", tipo.getDescricao());
            tipos.add(tipoMap);
        });
        return tipos;
    }
}