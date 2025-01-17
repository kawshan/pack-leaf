package com.packleaf.packleaf.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "jobmaster_has_item")
@AllArgsConstructor
@NoArgsConstructor
public class JobMasterHasItem {

    @Id
    @ManyToOne
    @JoinColumn(name = "jobmaster_id", referencedColumnName = "id")
    private JobMaster jobmaster_id;


    @Id
    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item item_id;





}
