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

import com.andrebarca.models.Papel;
/**
 *
 * @author andre
 */

@Repository
public interface PapelRepository extends CrudRepository<Papel, Long> {
    List<Papel> findAll(Sort sort);

    @Modifying
    @Query("delete from Papel a where a.id = ?1")
    void deleteById(Long id);
}
