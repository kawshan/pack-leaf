package com.packleaf.packleaf.service;

import com.packleaf.packleaf.dao.PendingGrnReportDao;
import com.packleaf.packleaf.dto.PendingGrnDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PendingGrnService {

    @Autowired
    private PendingGrnReportDao pendingGrnReportDao;

    public List<PendingGrnDto> getPendingGrnReports() {
        List<Object[]> results = pendingGrnReportDao.getPendingGRNReport();
        return results.stream().map(obj ->
                new PendingGrnDto(
                        (String) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (BigDecimal) obj[4],
                        (Double) obj[5],
                        (Double) obj[6],
                        (Date) obj[7],
                        (String) obj[8]
                )
        ).collect(Collectors.toList());
    }





    public List<PendingGrnDto> getPendingGrnReportsForCash() {
        List<Object[]> results = pendingGrnReportDao.getPendingGRNReportForCash();
        return results.stream().map(obj ->
                new PendingGrnDto(
                        (String) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (BigDecimal) obj[4],
                        (Double) obj[5],
                        (Double) obj[6],
                        (Date) obj[7],
                        (String) obj[8]
                )
        ).collect(Collectors.toList());
    }




}
