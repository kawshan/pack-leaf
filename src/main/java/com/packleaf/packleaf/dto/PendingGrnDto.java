package com.packleaf.packleaf.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PendingGrnDto {

    private String supplierName;
    private String companyName;
    private String grnNo;
    private String paymentGrnNumbers;
    private BigDecimal totalGrnValue;
    private Double totalPayed;
    private Double remaining;




}
