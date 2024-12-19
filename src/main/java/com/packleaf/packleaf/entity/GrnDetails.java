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
    private BigDecimal quantity;

    @Column(name = "rate")
    private BigDecimal rate;

    @Column(name = "grnheader")
    private String grnheader;

    @Column(name = "itemcode")
    private String itemcode;

    @Column(name = "gd_description")
    private String gd_description;

    @Column(name = "gd_referencenumber")
    private String gd_referencenumber;

    @ManyToOne
    @JoinColumn(name = "rawmaterial_id" , referencedColumnName = "id")
    private RawMaterial rawmaterial_id;


    @ManyToOne
    @JoinColumn(name = "ourpodetail_id", referencedColumnName = "id")
    private OurPoDetail ourpodetail_id;





}
