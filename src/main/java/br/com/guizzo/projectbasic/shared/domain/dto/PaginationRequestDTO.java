package br.com.guizzo.projectbasic.shared.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginationRequestDTO {
    private Integer page = 1;
    private Integer pageSize = 10;

    private String ordering = "asc";
    private String orderBy = "";
}
