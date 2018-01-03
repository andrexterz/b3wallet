/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.services;

import com.andrebarca.models.Dividendo;
import com.andrebarca.repositories.DividendoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
public class DividendoService {
    
    @Autowired
    DividendoRepository dividendoRepository;
    
    @RequestMapping(value = "/api/dividendos/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Dividendo dividendo) {
        Dividendo savedObj = dividendoRepository.save(dividendo);
        return new ResponseEntity<>(savedObj, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/dividendos", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Dividendo> list() {
        Iterable<Dividendo> dividendos = this.dividendoRepository.findAll();
        dividendos.forEach(div -> {
            System.out.println("código: " + div.getAcao().getCodigo() + ": " + "dividendo:" + div.getValor());
        });
        return (List) dividendos;
    }    
    
}
