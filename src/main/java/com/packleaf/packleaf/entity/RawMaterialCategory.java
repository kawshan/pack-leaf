package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data //for getters setters
@Table(name = "rawmaterialcategory") //define table name
@AllArgsConstructor
@NoArgsConstructor
public class RawMaterialCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "rmctkey")
    private String rmctkey;

    @Column(name = "rmctcode")
    private String rmctcode;

    @Column(name = "rmctname")
    private String rmctname;

    @Column(name = "rmctsize")
    private String rmctsize;

    @Column(name = "rmctshape")
    private String rmctshape;

    @Column(name = "rmctdescription")
    private String rmctdescription;

    @Column(name = "rmctvolumme")
    private String rmctvolumme;

    @Column(name = "rmctmoq")
    private String rmctmoq;

    @Column(name = "rmctduration")
    private String rmctduration;

    @Column(name = "rmctpacking")
    private String rmctpacking;

    @Column(name = "rmctstatus")
    private Boolean rmctstatus;



}
