package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "invoiceheader")
@AllArgsConstructor
@NoArgsConstructor

public class InvoiceHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "inkey")
    private String inkey;

    @Column(name = "invno")
    private String invno;

    @Column(name = "invdate")
    private LocalDate invdate;

    @Column(name = "ponumber")
    private String ponumber;

    @Column(name = "pokey")
    private String pokey;

    @Column(name = "dispatchkey")
    private String dispatchkey;



    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer_id;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company_id;




}
