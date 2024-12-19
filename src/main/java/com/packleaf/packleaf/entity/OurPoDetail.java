package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "ourpodetail")
@AllArgsConstructor
@NoArgsConstructor
public class OurPoDetail {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "qty")
    private BigDecimal qty;

    @Column(name = "rate")
    private BigDecimal rate;

    @Column(name = "ourpoheaderkey")
    private String ourpoheaderkey;

    @ManyToOne
    @JoinColumn(name = "rawmaterial_id",referencedColumnName = "id")
    private RawMaterial rawmaterial_id;



}
