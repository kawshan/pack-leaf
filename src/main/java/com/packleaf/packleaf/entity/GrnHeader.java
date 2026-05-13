package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "grnheader")
@AllArgsConstructor
@NoArgsConstructor
public class GrnHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "grnno")
    private String grnno;

    @Column(name = "grndate")
    private LocalDate grndate;

    @Column(name = "ourponumber")
    private String ourponumber;

    @Column(name = "grnheaderkey")
    private String grnheaderkey;

    @Column(name = "added_date_time")
    private LocalDateTime added_date_time;

    @Column(name = "supplier_invoice_number")
    private String supplier_invoice_number;

    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier_id;

    @ManyToOne
    @JoinColumn(name = "company_id",referencedColumnName = "id")
    private Company company_id;





}
