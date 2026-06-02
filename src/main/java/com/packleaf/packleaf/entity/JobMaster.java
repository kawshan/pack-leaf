package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "jobmaster")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class JobMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "jobdate")
    private LocalDate jobdate;

    @Column(name = "jobnumber")
    private String jobnumber;

    @Column(name = "jobquantity")
    private String jobquantity;

    @Column(name = "jobdescription")
    private String jobdescription;

    @Column(name = "jobmasterkey")
    private String jobmasterkey;

    @ManyToOne
    @JoinColumn(name = "customer_id",referencedColumnName = "id")
    private Customer customer_id;

    @ManyToOne
    @JoinColumn(name = "jobmasterstatus_id",referencedColumnName = "id")
    private JobMasterStatus jobmasterstatus_id;

    @ManyToMany
    @JoinTable(name = "jobmaster_has_finishing_types", joinColumns = @JoinColumn(name = "jobmaster_id"), inverseJoinColumns = @JoinColumn(name = "finishing_types_id"))
    private List<FinishingTypes> jmhft;


    @OneToMany(mappedBy = "jobmaster_id",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<JobMasterHasItem> jobMasterHasItems;





}
