package com.packleaf.packleaf.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

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
    private Date grnDate;
    private String supplier_invoice_number;




}
