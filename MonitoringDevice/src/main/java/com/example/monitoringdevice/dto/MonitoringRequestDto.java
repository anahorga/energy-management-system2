package com.example.monitoringdevice.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MonitoringRequestDto {
    private Long id;

    private LocalDate day;
}
