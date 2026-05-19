package com.packleaf.packleaf.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AllItemStockReportDto {

    private Integer id;
    private String rmkey;
    private String rmname;
    private String rmctname;
    private String rmpacking;
    private BigDecimal available_stock;
    private BigDecimal last_grn_rate;
    private Date last_grn_date;





}
