package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "supplierkey")
    private String supplierkey;

    @Column(name = "suppliername")
    private String suppliername;

    @Column(name = "supplieraddress")
    private String supplieraddress;

    @Column(name = "suppliervatno")
    private String suppliervatno;

    @Column(name = "suppliertelephone")
    private String suppliertelephone;

    @Column(name = "suppliercollectingaddress")
    private String suppliercollectingaddress;

    @Column(name = "supplierbank")
    private String supplierbank;

    @Column(name = "supplierstatus")
    private Boolean supplierstatus;

    @Column(name = "suppliercontactperson")
    private String suppliercontactperson;






}
