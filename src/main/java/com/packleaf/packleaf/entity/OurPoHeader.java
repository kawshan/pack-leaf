package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "ourpoheader")
@AllArgsConstructor
@NoArgsConstructor
public class OurPoHeader {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ourpokey")
    private String ourpokey;

    @Column(name = "ourpodate")
    private LocalDate ourpodate;

    @Column(name = "refquotation")
    private String refquotation;


    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier_id;








}
