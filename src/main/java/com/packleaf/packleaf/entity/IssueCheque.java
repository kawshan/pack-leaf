package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "issuecheque")
@AllArgsConstructor
@NoArgsConstructor

public class IssueCheque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "issue_cheque_date")
    private LocalDate issue_cheque_date;

    @Column(name = "cheque_date")
    private LocalDate cheque_date;

    @Column(name = "cheque_number")
    private String cheque_number;

    @Column(name = "cheque_amount")
    private BigDecimal cheque_amount;

    @Column(name = "issue_cheque_code")
    private String issue_cheque_code;

    @Column(name = "description")
    private String description;


    @ManyToOne
    @JoinColumn(name = "issuechequestatus_id",referencedColumnName = "id")
    private IssueChequeStatus issuechequestatus_id;

    @ManyToOne
    @JoinColumn(name = "ownbankaccount_id", referencedColumnName = "id")
    private OwnBankAccount ownbankaccount_id;

}
