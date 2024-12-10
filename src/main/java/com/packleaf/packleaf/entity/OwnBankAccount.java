package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "ownbankaccount")
@AllArgsConstructor
@NoArgsConstructor

public class OwnBankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

    @Column(name = "bank_key")
    private String bank_key;

    @Column(name = "bank_account_name")
    private String bank_account_name;

    @Column(name = "bank_name")
    private String bank_name;

    @Column(name = "bank_code")
    private String bank_code;

    @Column(name = "branch_name")
    private String branch_name;

    @Column(name = "branch_code")
    private String branch_code;

    @Column(name = "account_no")
    private String account_no;

    @Column(name = "bank_description")
    private String bank_description;

    @ManyToOne
    @JoinColumn(name = "bankshortname_id",referencedColumnName = "id")
    private BankShortName bankshortname_id;

    @ManyToOne
    @JoinColumn(name = "ownbankaccountstatus_id",referencedColumnName = "id")
    private OwnBankAccountStatus ownbankaccountstatus_id;


}
