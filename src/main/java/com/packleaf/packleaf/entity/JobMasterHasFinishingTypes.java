package com.packleaf.packleaf.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "jobmaster_has_finishing_types")
@AllArgsConstructor
@NoArgsConstructor
public class JobMasterHasFinishingTypes {

    @Id
    @ManyToOne
    @JoinColumn(name = "jobmaster_id", referencedColumnName = "id")
    private JobMaster jobmaster_id;


    @Id
    @ManyToOne
    @JoinColumn(name = "finishing_types_id", referencedColumnName = "id")
    private FinishingTypes finishing_types_id;





}
