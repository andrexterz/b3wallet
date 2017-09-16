/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.controllers;

import com.andrebarca.models.Acao;
import com.andrebarca.repositories.AcaoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author andre
 */

@RestController
public class Home {
    
    @Autowired
    AcaoRepository acaoRepository;
    
    @GetMapping("/acoes-json")
    public List<Acao> listAcoes() {
        Iterable<Acao> acoes = this.acaoRepository.findAll();
        acoes.forEach(a -> {
            System.out.println("acao: " + a.getCodigo());
        }); 
        return (List) acoes ;
    }
}