/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.repositories;

import com.andrebarca.models.Acao;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author andre
 */

@Repository
public interface AcaoRepository extends CrudRepository<Acao, Long> {
    List<Acao> findAll(Sort sort);
    
}
