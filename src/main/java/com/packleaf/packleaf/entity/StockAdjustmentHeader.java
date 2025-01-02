package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "stock_adjustment_header")
@AllArgsConstructor
@NoArgsConstructor

public class StockAdjustmentHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "adjustment_no")
    private String adjustment_no;

    @Column(name = "adjustment_key")
    private String adjustment_key;

    @Column(name = "adjustment_date")
    private LocalDate adjustment_date;

    @ManyToOne
    @JoinColumn(name = "company_id",referencedColumnName = "id")
    private Company company_id;


}
