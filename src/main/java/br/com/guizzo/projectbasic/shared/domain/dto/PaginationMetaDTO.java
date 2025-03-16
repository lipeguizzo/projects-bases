package br.com.guizzo.projectbasic.shared.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaginationMetaDTO {
    private Integer page;
    private Integer pageSize;
    private Integer totalItems;
    private Integer totalPages;
    private PaginationMetaLinksDTO links;
}
