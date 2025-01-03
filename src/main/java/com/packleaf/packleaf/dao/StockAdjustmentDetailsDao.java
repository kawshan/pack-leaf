package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.StockAdjustmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockAdjustmentDetailsDao extends JpaRepository<StockAdjustmentDetails,Integer> {

    @Query(value = "select sad from StockAdjustmentDetails sad where sad.header_key=?1")
    public List<StockAdjustmentDetails> getStockAdjustmentDetailsByHeaderKey(String headerKey);




}
