package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "issuenotedetail")
@AllArgsConstructor
@NoArgsConstructor
public class IssueNoteDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "quantity")
    private BigDecimal quantity;

    @Column(name = "issuenoteheader")
    private String issuenoteheader;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "rawmaterial_id",referencedColumnName = "id")
    private RawMaterial rawmaterial_id;


}
