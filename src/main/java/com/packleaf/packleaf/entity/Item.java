package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "item")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Item {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "imkey")
    private String imkey;


    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "code")
    private String code;

    @Column(name = "itmname")
    private String itmname;

    @Column(name = "description")
    private String description;

    @Column(name = "nocolours")
    private String nocolours ;

    @Column(name = "plate")
    private String plate;

    @Column(name = "foil")
    private Boolean foil;

    @Column(name = "spotuv")
    private String spotuv;

    @Column(name = "addeddatetime")
    private LocalDateTime addeddatetime;

    @Column(name = "updatedatetime")
    private LocalDateTime updatedatetime;

    @Column(name = "deletedatetime")
    private LocalDateTime deletedatetime;

    @Column(name = "addeduserid")
    private Integer addeduserid;

    @Column(name = "updateuserid")
    private Integer updateuserid;

    @Column(name = "deleteuserid")
    private Integer deleteuserid;

    @Column(name = "status")
    private Boolean status;


    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private ItemCategory category_id;

    @ManyToOne
    @JoinColumn(name = "laminate_id", referencedColumnName = "id")
    private Laminate laminate_id;











}
