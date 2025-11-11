package com.example.deviceservice.dto;

import lombok.Data;

@Data
public class DeviceDto {

    private Long id;

    private String name;
    private Double consumption;

    private UserDto user;

}
