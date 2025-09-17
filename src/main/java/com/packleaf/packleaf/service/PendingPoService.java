package com.packleaf.packleaf.service;

import com.packleaf.packleaf.dao.PendingPoReportDao;
import com.packleaf.packleaf.dto.PendingPoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PendingPoService {


    @Autowired
    private PendingPoReportDao pendingPoReportDao;



    // Helper method to safely convert any numeric type to Double
    private Double toDouble(Object obj) {
        if (obj == null) return 0.0;
        if (obj instanceof Number) return ((Number) obj).doubleValue();
        try {
            return Double.parseDouble(obj.toString());
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    // Helper method to safely convert any numeric type to Integer
    private Integer toInteger(Object obj) {
        if (obj == null) return null;
        if (obj instanceof Number) return ((Number) obj).intValue();
        try {
            return Integer.parseInt(obj.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }



    public List<PendingPoDto> generatePendingPO(){
        List<Object[]> results = pendingPoReportDao.getPendingPoReport();
        return results.stream().map(obj ->
                new PendingPoDto(
                        (String) obj[0],
                        (String) obj[1],
                        (Date) obj[2],
                        (String) obj[3],
                        (Integer) obj[4],
                        (String) obj[5],
                        toDouble(obj[6]),              // invoiceQuantity
                        toDouble(obj[7]),              // poQuantity
                        toDouble(obj[8]),               // remainingQuantity
                        toDouble(obj[9])  // map porate here
                )
                ).collect(Collectors.toList());
    }
}
