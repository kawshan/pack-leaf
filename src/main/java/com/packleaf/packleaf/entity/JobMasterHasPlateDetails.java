package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "jobmaster_has_plate_details")
@AllArgsConstructor
@NoArgsConstructor
public class JobMasterHasPlateDetails {

    @Id
    @ManyToOne
    @JoinColumn(name = "jobmaster_id", referencedColumnName = "id")
    private JobMaster jobmaster_id;


    @Id
    @ManyToOne
    @JoinColumn(name = "plate_details_id", referencedColumnName = "id")
    private PlateDetails plate_details_id;



}
