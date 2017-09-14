/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andrebarca.models;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author andre
 */

@MappedSuperclass
public abstract class Base implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Temporal(TemporalType.DATE)
    @Column(insertable = true, updatable = false)
    private Date dataCriacao;

    @Temporal(TemporalType.DATE)
    private Date dataAtualizacao;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    @Override
    public String toString() {
        return String.format("%s-[%d]", this.getClass().getName(), id);
    }    
}
