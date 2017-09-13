/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.controllers;

import com.andrebarca.controllers.models.Acao;
import com.andrebarca.repositories.AcaoRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.PostConstruct;
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
    
    @GetMapping("/numbers")
    public List<Integer> listProducts() {
        List<Integer> lst = new ArrayList<>(
                Arrays.asList(1, 2, 3, 4)
        );
        return lst;
    }
    
    @PostConstruct
    public void runOnInit() {
        System.out.println("adicionando acao");
        Acao acao = new Acao("PETR4", "Petrobras SA", new ArrayList<>());
        System.out.println("Salvando entidade " + acao.toString());
        acaoRepository.save(acao);
    }
}