package com.andrebarca.models;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


/**
 *
 * @author andre
 */
@Entity
public class Nota extends Base {
	
	private static final long serialVersionUID = 1L;	

    public Nota() {

    }

    public Nota(Acao acao, String anotacao) {
        this.acao = acao;
        this.anotacao = anotacao;
    }

    @ManyToOne
    @JoinColumn(name = "ACAO_ID")
    @JsonIgnoreProperties("operacoes")
    private Acao acao;

    @NotBlank
    private String anotacao;

    public Acao getAcao() {
        return acao;
    }

    public void setAcao(Acao acao) {
        this.acao = acao;
    }

    public String getAnotacao() {
        return anotacao;
    }

    public void setAnotacao(String anotacao) {
        this.anotacao = anotacao;
    }
}
