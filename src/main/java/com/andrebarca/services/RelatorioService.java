package com.andrebarca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.andrebarca.models.Operacao;
import com.andrebarca.repositories.OperacaoRepository;

/**
 *
 * @author andre
 */
@RestController
public class RelatorioService {

    @Autowired
    OperacaoRepository operacaoRepository;

    @RequestMapping(value = "/api/report", method=RequestMethod.GET)
    public ResponseEntity<?> report() {
        Iterable<Operacao> operacoes = this.operacaoRepository.findAll(
                new Sort(Direction.ASC, "acao.codigo")
                .and(new Sort(Direction.ASC,"dataOperacao"))
                .and(new Sort(Direction.ASC,"tipoOperacao"))
        );
        return new ResponseEntity<>(operacoes, HttpStatus.OK);
    }
}
