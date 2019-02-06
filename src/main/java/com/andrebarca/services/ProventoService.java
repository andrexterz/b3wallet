/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.andrebarca.models.Provento;
import com.andrebarca.models.TipoProvento;
import com.andrebarca.repositories.ProventoRepository;

/**
 *
 * @author andre
 */

@RestController
public class ProventoService {

    @Autowired
    ProventoRepository proventoRepository;

    @RequestMapping(value = "/api/proventos/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Provento provento) {
        Provento savedObj = proventoRepository.save(provento);
        return new ResponseEntity<>(savedObj, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/proventos/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable long id) {
        boolean removed = false;
        try {
            proventoRepository.deleteById(id);
            removed = true;
        } catch (Exception e) {
            System.out.println("could not delete obj id: " + id);
        }
        return new ResponseEntity<>(removed, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/proventos", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> list() {
        Iterable<Provento> proventos = this.proventoRepository.findAll();
        return new ResponseEntity<>(proventos, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/proventos/tipos", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listTypeOptions() {
    	List<Map<String, String>> tipos = new ArrayList<>();
    	Arrays.stream(TipoProvento.values()).forEach(tipo -> tipos.add(new HashMap<String, String>() {{
    		put("tipo", tipo.getTipo());
			put("descricao", tipo.getDescricao());
    		}}));
    	return new ResponseEntity<>(tipos, HttpStatus.OK);
    }

}
