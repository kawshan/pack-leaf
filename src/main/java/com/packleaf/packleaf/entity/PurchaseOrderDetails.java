package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "podetail")
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "purchaseorderkey")
    private String purchaseorderkey;

    @Column(name = "imkey")
    private String imkey;

    @Column(name = "poqty")
    private String poqty;

    @Column(name = "porate")
    private BigDecimal porate;

    @Column(name = "povalue")
    private BigDecimal povalue;


    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item item_id;



}
