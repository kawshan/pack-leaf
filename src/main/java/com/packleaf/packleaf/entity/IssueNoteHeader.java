package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "issuenoteheader")
@AllArgsConstructor
@NoArgsConstructor
public class IssueNoteHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "issuenotedate")
    private LocalDate issuenotedate;

    @Column(name = "issuenotenumber")
    private String issuenotenumber;

    @Column(name = "headerkey")
    private String headerkey;

    @ManyToOne
    @JoinColumn(name = "jobmaster_id", referencedColumnName = "id")
    private JobMaster jobmaster_id;


}
