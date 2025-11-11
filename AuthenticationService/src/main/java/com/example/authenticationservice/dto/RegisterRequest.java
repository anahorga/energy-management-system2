package com.example.authenticationservice.dto;

import com.example.authenticationservice.entity.UserRole;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record RegisterRequest(@NotBlank String username, @NotBlank String password, UserRole userRole) {
}
