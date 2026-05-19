package com.packleaf.packleaf.service;

import com.packleaf.packleaf.dao.AllItemStockReportDao;
import com.packleaf.packleaf.dto.AllItemStockReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AllItemStockReportService {

    @Autowired
    private AllItemStockReportDao allItemStockReportDao;


    public List<AllItemStockReportDto> getAllItemStockReport(String fromDate, String toDate) {
        List<Object[]> result = allItemStockReportDao.findAllItemStockReport(fromDate, toDate);
        return result.stream().map(obj ->
                new AllItemStockReportDto(
                        (Integer) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (String) obj[4],
                        (BigDecimal) obj[5],
                        (BigDecimal) obj[6],
                        (Date) obj[7]
                )
                ).collect(Collectors.toList());
    }




}
