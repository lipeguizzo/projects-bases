package br.com.guizzo.projectbasic.shared.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ErrorResponseDTO{
    private final Integer status;
    private final String message;
    private final List<String> details;
}
