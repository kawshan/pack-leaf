package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "grndetails")
@AllArgsConstructor
@NoArgsConstructor

public class GrnDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "quantity")
    private String quantity;

    @Column(name = "rate")
    private BigDecimal rate;

    @Column(name = "grnheader")
    private String grnheader;


    @ManyToOne
    @JoinColumn(name = "rawmaterial_id" , referencedColumnName = "id")
    private RawMaterial rawmaterial_id;








}
