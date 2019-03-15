package com.andrebarca.services;

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

import com.andrebarca.models.Acao;
import com.andrebarca.models.TipoPapel;
import com.andrebarca.repositories.AcaoRepository;

/**
 *
 * @author andre
 */

@RestController
public class AcaoService {
    
    @Autowired
    AcaoRepository acaoRepository;
    
    @RequestMapping(value = "/api/acoes/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Acao acao) {
        Acao savedObj = this.acaoRepository.save(acao);
        return new ResponseEntity<>(savedObj, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/acoes", method = RequestMethod.GET,  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> list() {
        Iterable<Acao> acoes = this.acaoRepository.findAll(new Sort(Direction.ASC, "codigo"));
        return new ResponseEntity<>(acoes, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/acoes/tipos", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listOptionsTipoPapel() {
        return new ResponseEntity<>(TipoPapel.getPropertyList(), HttpStatus.OK);
    }

}