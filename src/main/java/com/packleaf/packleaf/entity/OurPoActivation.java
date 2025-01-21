package com.packleaf.packleaf.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "our_po_activation")
@AllArgsConstructor
@NoArgsConstructor
public class OurPoActivation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "activation_status")
    private Boolean activation_status;

    @ManyToOne
    @JoinColumn(name = "ourpoheader_id", referencedColumnName = "id")
    private OurPoHeader ourpoheader_id;

}
