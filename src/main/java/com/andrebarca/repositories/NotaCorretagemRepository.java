/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.andrebarca.models.NotaCorretagem;

/**
 *
 * @author andre
 */

@Repository
public interface NotaCorretagemRepository extends CrudRepository<NotaCorretagem, Long>{

    @Modifying
    @Query("delete from NotaCorretagem nc where nc.id = ?1")
    void deleteById(Long id);

    List<NotaCorretagem> findAll(Sort sort);
    
    @Query("select dataPregao from NotaCorretagem")
    List<Date> listAllDataNotaCorretagem();
}
