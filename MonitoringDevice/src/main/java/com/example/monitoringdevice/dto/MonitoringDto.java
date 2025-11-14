package com.example.monitoringdevice.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MonitoringDto {
    private Long id;

    private LocalDateTime timestamp;
    private Double consumption;

    private DeviceDto device;

}
