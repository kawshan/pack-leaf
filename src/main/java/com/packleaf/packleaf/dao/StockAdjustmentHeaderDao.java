package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.StockAdjustmentHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface StockAdjustmentHeaderDao extends JpaRepository<StockAdjustmentHeader,Integer> {


    @Query(value = "select concat('ADJ',lpad(max(substring(stock_adjustment_header.adjustment_key,4))+1,4,'0')) as max_sock_adjustment_header_key from stock_adjustment_header;",nativeQuery = true)
    public String getMaxSockAdjustmentHeaderKey();


    @Query(value = "select sah.id from StockAdjustmentHeader sah where sah.adjustment_key=?1")
    public Integer getIdByAdjustmentKey(String adjustmentKey);

    @Transactional
    @Modifying
    @Query(value = "delete from stock_adjustment_details where header_key=?1",nativeQuery = true)
    public void deleteByHeaderKey(String headerKey);


}
