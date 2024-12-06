package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "invoicedetail")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class InvoiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "invoicekey")
    private String invoicekey;

    @Column(name = "imkey")
    private String imkey;

    @Column(name = "invqty")
    private String invqty;

    @Column(name = "invrate")
    private String invrate;

    @Column(name = "invvalue")
    private String invvalue;

    @ManyToOne
    @JoinColumn(name = "item_id" ,referencedColumnName = "id")
    private Item item_id;







}
