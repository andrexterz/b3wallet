/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

import com.andrebarca.models.Empresa;
import com.andrebarca.repositories.EmpresaRepository;

/**
 *
 * @author andre
 */

@RestController
public class EmpresaService {
    
    @Autowired
    EmpresaRepository empresaRepository;
    
    @RequestMapping(value = "/api/empresas/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Empresa empresa) {
        Empresa savedObj = this. empresaRepository.save( empresa);
        return new ResponseEntity<>(savedObj, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/empresas", method = RequestMethod.GET,  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> list() {
        Iterable<Empresa> acoes = this. empresaRepository.findAll(new Sort(Direction.ASC, "acoes.codigo"));
        return new ResponseEntity<>(acoes, HttpStatus.OK);
    }
}