package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "paymentvoucherheader")
@AllArgsConstructor
@NoArgsConstructor


public class PaymentVoucherHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "payment_voucher_header_key")
    private String payment_voucher_header_key;

    @Column(name = "payment_voucher_date")
    private LocalDate payment_voucher_date;

    @Column(name = "payment_voucher_number")
    private String payment_voucher_number;

    @Column(name = "payment_mode")
    private String payment_mode;

    @Column(name = "payment_grn_numbers")
    private String payment_grn_numbers;

    @Column(name = "cheque_number")
    private String cheque_number;

    @Column(name = "cheque_amount")
    private BigDecimal cheque_amount;


    @Column(name = "pdc_date")
    private LocalDate pdc_date;


    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier_id;

    @ManyToOne
    @JoinColumn(name = "ownbankaccount_id",referencedColumnName = "id")
    private OwnBankAccount ownbankaccount_id;




}
