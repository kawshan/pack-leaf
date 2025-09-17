package com.packleaf.packleaf.controller;

import com.packleaf.packleaf.dto.PendingPoDto;
import com.packleaf.packleaf.service.PendingPoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pendingPoReport")
public class PendingPoController {

    @Autowired
    private PendingPoService pendingPoService;




    @GetMapping
    public List<PendingPoDto> getPendingPoReport() {
        return pendingPoService.generatePendingPO();
    }






}
