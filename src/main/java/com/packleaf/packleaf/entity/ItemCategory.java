package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "category")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemCategory {


    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ctkey")
    private String ctkey;

    @Column(name = "ctcode")
    private String ctcode;

    @Column(name = "ctname")
    private String ctname;

    @Column(name = "ctsize")
    private String ctsize;

    @Column(name = "ctshape")
    private String ctshape;

    @Column(name = "ctdescription")
    private String ctdescription;

    @Column(name = "ctvolumme")
    private String ctvolumme;

    @Column(name = "ctmoq")
    private String ctmoq;

    @Column(name = "ctduration")
    private String ctduration;

    @Column(name = "ctpacking")
    private String ctpacking;




}
