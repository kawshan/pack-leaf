package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "rawmaterial")
@Data
@AllArgsConstructor
@NoArgsConstructor



public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "rmkey")
    private String rmkey;

    @Column(name = "rmname")
    private String rmname;

//    @Column(name = "rmform")
//    private String rmform;

    @Column(name = "rmpacking")
    private String rmpacking;

    @Column(name = "rmqty")
    private String rmqty;

    @Column(name = "rmrate")
    private BigDecimal rmrate;

    @Column(name = "rmreorderlevel")
    private String rmreorderlevel;

    @Column(name = "rmstatus")
    private Boolean rmstatus;

    @ManyToOne
    @JoinColumn(name = "rawmaterialcategory_id", referencedColumnName = "id")
    private RawMaterialCategory rawmaterialcategory_id;

    @ManyToOne
    @JoinColumn(name = "rawmaterialform_id", referencedColumnName = "id")
    private RawMaterialForm rawmaterialform_id;


}
