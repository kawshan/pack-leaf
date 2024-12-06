package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "customerkey")
    private String customerkey;

    @Column(name = "customername")
    private String customername;

    @Column(name = "customeraddress")
    private String customeraddress;

    @Column(name = "customervatno")
    private String customervatno;

    @Column(name = "customertelephone")
    private String customertelephone;

    @Column(name = "customerdeliveryaddress")
    private String customerdeliveryaddress;

    @Column(name = "customerbank")
    private String customerbank;

    @Column(name = "customerstatus")
    private Boolean customerstatus;

    @Column(name = "customercontactperson")
    private String customercontactperson;



}
