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

import com.andrebarca.models.Papel;
import com.andrebarca.repositories.PapelRepository;

/**
 *
 * @author andre
 */

@RestController
public class PapelService {
    
    @Autowired
    PapelRepository papelRepository;
    
    @RequestMapping(value = "/api/papeis/save", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Papel papel) {
        Papel savedObj = this.papelRepository.save(papel);
        return new ResponseEntity<>(savedObj, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/papeis", method = RequestMethod.GET,  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> list() {
        Iterable<Papel> papeis = this.papelRepository.findAll(new Sort(Direction.ASC, "codigo"));
        return new ResponseEntity<>(papeis, HttpStatus.OK);
    }
}