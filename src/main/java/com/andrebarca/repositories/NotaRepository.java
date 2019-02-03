/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.andrebarca.models.Nota;

/**
 *
 * @author andre
 */

@Repository
public interface NotaRepository extends CrudRepository<Nota, Long>{

    @Modifying
    @Query("delete from Nota o where o.id = ?1")
    void deleteById(Long id);

    List<Nota> findAll(Sort sort);
}
