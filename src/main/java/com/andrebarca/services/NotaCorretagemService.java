package com.andrebarca.services;

import com.andrebarca.models.NotaCorretagem;
import com.andrebarca.repositories.NotaCorretagemRepository;
import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author andre
 */
@RestController
public class NotaCorretagemService {

	@Autowired
	NotaCorretagemRepository notaCorretagemRepository;

	@RequestMapping(value = "/api/notas-de-corretagem/save", method = RequestMethod.POST)
	public ResponseEntity<?> save(@RequestBody NotaCorretagem notaCorretagem) throws JsonProcessingException {
		NotaCorretagem savedObj = notaCorretagemRepository.save(notaCorretagem);
		return new ResponseEntity<>(savedObj, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/api/notas-de-corretagem/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable long id) {
		boolean removed = false;
		try {
			notaCorretagemRepository.deleteById(id);
			removed = true;
		} catch (Exception e) {
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(removed, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/notas-de-corretagem/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> get(@PathVariable long id) {
		NotaCorretagem notaCorretagem = this.notaCorretagemRepository.getById(id);
		return new ResponseEntity<>(notaCorretagem, HttpStatus.OK);
	}

	@RequestMapping(value = "/api/notas-de-corretagem", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> list() {
		Iterable<NotaCorretagem> notasCorretagem = this.notaCorretagemRepository.findAll();
		return new ResponseEntity<>(notasCorretagem, HttpStatus.OK);
	}
}
