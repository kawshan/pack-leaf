package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "poheader")
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOrderHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "pokey")
    private String pokey;

    @Column(name = "ponumber")
    private String ponumber;

    @Column(name = "podate")
    private LocalDate podate;


    @ManyToOne
    @JoinColumn(name = "customer_id" ,referencedColumnName = "id")
    private Customer customer_id;

    @ManyToOne
    @JoinColumn(name = "company_id",referencedColumnName = "id")
    private Company company_id;





}
