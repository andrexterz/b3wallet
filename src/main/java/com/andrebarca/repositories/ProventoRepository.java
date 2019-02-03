/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.andrebarca.models.Provento;

/**
 *
 * @author andre
 */

@Repository
public interface ProventoRepository extends CrudRepository<Provento, Long>{

  @Modifying
  @Query("delete from Provento d where d.id = ?1")
  void deleteById(Long id);

}
