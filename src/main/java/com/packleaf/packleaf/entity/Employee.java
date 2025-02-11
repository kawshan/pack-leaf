package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "employee")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "empnum")
    private String empnum;

    @Column(name = "full_name")
    private String full_name;

    @Column(name = "calling_name")
    private String calling_name;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "nic")
    private String nic;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "land_no")
    private String land_no;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "added_date_time")
    private LocalDateTime added_date_time;

    @Column(name = "update_date_time")
    private LocalDateTime update_date_time;

    @Column(name = "delete_date_time")
    private LocalDateTime delete_date_time;

    @Column(name = "emp_photo")
    private byte[] emp_photo;

    @Column(name = "emp_photo_name")
    private String emp_photo_name;



    @ManyToOne
    @JoinColumn(name = "gender_id", referencedColumnName = "id")
    private Gender gender_id;


    @ManyToOne
    @JoinColumn(name = "employeestatus_id",referencedColumnName = "id")
    private EmployeeStatus employeestatus_id;


    @ManyToOne
    @JoinColumn(name = "designation_id",referencedColumnName = "id")
    private Designation designation_id;





}
