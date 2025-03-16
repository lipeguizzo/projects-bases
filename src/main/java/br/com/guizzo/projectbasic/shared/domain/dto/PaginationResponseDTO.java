package br.com.guizzo.projectbasic.shared.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PaginationResponseDTO<T> {
    private List<T> data;
    private PaginationMetaDTO _meta;
}
