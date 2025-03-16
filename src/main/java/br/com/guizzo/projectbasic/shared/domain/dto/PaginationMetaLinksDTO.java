package br.com.guizzo.projectbasic.shared.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaginationMetaLinksDTO {
    private String first;
    private String prev;
    private String next;
    private String last;
}
