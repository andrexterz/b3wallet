/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.services;

import com.andrebarca.models.Operacao;
import com.andrebarca.repositories.OperacaoRepository;
import java.text.SimpleDateFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author andre
 */
@RestController
public class OperacaoService {

    @Autowired
    OperacaoRepository operacaoRepository;
    
    @RequestMapping(value = "/api/operacoes/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Operacao operacao) {
        Operacao savedObj = operacaoRepository.save(operacao);
        System.out.println(
                "------------------------------------------------------------\n" + 
                "código....: " + operacao.getAcao().getCodigo()
                + "\noperacao:" + operacao.getTipoOperacao()
                + "\ndata...:" + new SimpleDateFormat("dd/MM/yyy").format(operacao.getDataOperacao())
        );
        return new ResponseEntity<>(savedObj, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/operacoes", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Operacao> list() {
        Iterable<Operacao> operacoes = this.operacaoRepository.findAll(
                new Sort(Direction.ASC, "acao.codigo")
                .and(new Sort(Direction.ASC,"dataOperacao"))
                .and(new Sort(Direction.ASC,"tipoOperacao"))
        );
        return (List) operacoes;
    }
}
    