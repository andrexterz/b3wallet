/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.andrebarca.models.Dividendo;
import com.andrebarca.repositories.DividendoRepository;

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
    
    @RequestMapping(value = "/api/dividendos/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable long id) {
        boolean removed = false;
        try {
            dividendoRepository.deleteById(id);
            removed = true;
        } catch (Exception e) {
            System.out.println("could not delete obj id: " + id);
        }
        return new ResponseEntity<>(removed, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/dividendos", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> list() {
        Iterable<Dividendo> dividendos = this.dividendoRepository.findAll();
        dividendos.forEach(div -> {
            System.out.println("código: " + div.getAcao().getCodigo() + ": " + "dividendo:" + div.getValor());
        });
        return new ResponseEntity<>(dividendos, HttpStatus.OK);
    }    
    
}
