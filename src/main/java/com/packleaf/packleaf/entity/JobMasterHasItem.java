package com.packleaf.packleaf.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "jobmaster_has_item")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobMasterHasItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "jobmaster_id",referencedColumnName = "id")
    private JobMaster jobmaster_id;


    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item item_id;

    @Column(name = "jobmaster_has_item_qty")
    private BigDecimal jobmaster_has_item_qty;


    
    
    
    
    
}
