/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.repositories;

import com.andrebarca.models.Operacao;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author andre
 */

@Repository
public interface OperacaoRepository extends CrudRepository<Operacao, Long>{
    List<Operacao> findAll(Sort sort);
}
