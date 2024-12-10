package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "checkbookmaster")
@AllArgsConstructor
@NoArgsConstructor

public class CheckBookMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "running_number")
    private String running_number;

    @Column(name = "number_of_checks")
    private String number_of_checks;

    @Column(name = "start_number")
    private String start_number;

    @Column(name = "end_number")
    private String end_number;


    @ManyToOne
    @JoinColumn(name = "checkbookmasterstatus_id", referencedColumnName = "id")
    private CheckBookMasterStatus checkbookmasterstatus_id;

    @ManyToOne
    @JoinColumn(name = "bankshortname_id",referencedColumnName = "id")
    private BankShortName bankshortname_id;


}
