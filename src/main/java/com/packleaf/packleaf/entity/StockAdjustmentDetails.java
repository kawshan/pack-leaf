package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "stock_adjustment_details")
@AllArgsConstructor
@NoArgsConstructor


public class StockAdjustmentDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "quantity")
    private BigDecimal quantity;

    @Column(name = "code")
    private String code;

    @Column(name = "rate")
    private BigDecimal rate;

    @Column(name = "header_key")
    private String header_key;

    @ManyToOne
    @JoinColumn(name = "rawmaterial_id",referencedColumnName = "id")
    private RawMaterial rawmaterial_id;




}
