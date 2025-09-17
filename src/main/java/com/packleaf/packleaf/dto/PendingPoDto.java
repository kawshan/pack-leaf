package com.packleaf.packleaf.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PendingPoDto {

    private String pokey;
    private Integer Item_id;
    private String itmname;
    private Double poQuantity;
    private Double invoiceQuantity;
    private Double remainingQuantity;
    private Double porate;  // new field




}
