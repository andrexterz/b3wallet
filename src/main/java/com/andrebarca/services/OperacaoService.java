/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.services;

import com.andrebarca.models.Operacao;
import com.andrebarca.repositories.OperacaoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author andre
 */
@RestController
public class OperacaoService {

    @Autowired
    OperacaoRepository operacaoRepository;

    @RequestMapping(value = "/operacoes", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Operacao> listOperacoes() {
        Iterable<Operacao> operacoes = this.operacaoRepository.findAll();
        operacoes.forEach(op -> {
            System.out.println("código: " + op.getAcao().getCodigo() + ": " + "operacao:" + op.getTipoOperacao());
        });
        return (List) operacoes;
    }
}
