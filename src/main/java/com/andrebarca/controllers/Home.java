/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.controllers;

import com.andrebarca.models.Acao;
import com.andrebarca.models.Operacao;
import com.andrebarca.models.TipoOperacao;
import com.andrebarca.repositories.AcaoRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
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
        Acao acao = new Acao("MGLU3", "Magazine Luiza SA", new ArrayList<>());
        Operacao op = new Operacao(acao, 10.25, 100, 4.20, TipoOperacao.VENDA, Calendar.getInstance().getTime());
        acao.addOperacao(op);
        System.out.println("Salvando entidade " + acao.toString());
        acaoRepository.save(acao);
     }
}