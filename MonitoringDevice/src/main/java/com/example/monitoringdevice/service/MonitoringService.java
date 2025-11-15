package com.example.monitoringdevice.service;

import com.example.monitoringdevice.dto.DeviceDto;
import com.example.monitoringdevice.entity.DeviceEntity;
import com.example.monitoringdevice.exceptions.DeviceNotFoundException;
import com.example.monitoringdevice.mapper.DeviceMapper;
import com.example.monitoringdevice.mapper.MonitoringMapper;
import com.example.monitoringdevice.repository.DeviceRepository;
import com.example.monitoringdevice.repository.MonitoringRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MonitoringService {

        public final DeviceMapper deviceMapper;
    private  final DeviceRepository deviceRepository;
    private final MonitoringRepository monitoringRepository;
    private final MonitoringMapper monitoringMapper;

    public DeviceDto saveDevice(DeviceDto deviceDto)
    {
        DeviceEntity deviceEntity = deviceMapper.deviceDtoToDeviceEntity(deviceDto);

        if(deviceEntity.getId()==null)
            throw new IllegalArgumentException("Device id must be provided (no auto-generation).");
        if(deviceRepository.existsById(deviceEntity.getId()))
            throw new DuplicateKeyException("Device with id " + deviceEntity.getId() + " already exists");

        return deviceMapper.deviceEntityToDeviceDto(deviceRepository.save(deviceEntity));
    }
    public void deleteDevice(Long id) {
        if (!deviceRepository.existsById(id)) {
            throw new DeviceNotFoundException("Device with id " + id + " not found");
        }
        deviceRepository.deleteById(id);
    }
}
