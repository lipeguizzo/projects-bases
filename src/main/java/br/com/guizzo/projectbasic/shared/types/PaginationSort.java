package br.com.guizzo.projectbasic.shared.types;

import org.springframework.data.domain.Sort.Direction;

public class PaginationSort {

    public static Direction getDirection(String sort){
        return switch (sort){
            case "asc" ->  Direction.ASC;
            case "desc" -> Direction.DESC;
            default -> Direction.ASC;
        };
    }

}
