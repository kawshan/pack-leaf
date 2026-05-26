package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dto.PendingGrnDto;
import com.packleaf.packleaf.service.PendingGrnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/pendingGrn")
public class PendingGrnController {

    @Autowired
    private PendingGrnService pendingGrnService;

    @GetMapping
    public List<PendingGrnDto> getPendingGrn() {
        return pendingGrnService.getPendingGrnReports();
    }


    @GetMapping(value = "/forCash")
    public List<PendingGrnDto> getPendingGrnForCash() {
        return pendingGrnService.getPendingGrnReportsForCash();
    }



}
