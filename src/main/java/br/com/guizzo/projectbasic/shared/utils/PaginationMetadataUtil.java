package br.com.guizzo.projectbasic.shared.utils;

import br.com.guizzo.projectbasic.shared.domain.dto.PaginationMetaDTO;
import br.com.guizzo.projectbasic.shared.domain.dto.PaginationMetaLinksDTO;
import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class PaginationMetadataUtil {

    @Getter
    @AllArgsConstructor
    public static class PaginationMetadata {
        private int page;
        private int pageSize;
        private int totalItems;
        private int totalPages;
        private PaginationMetaLinksDTO links;
    }

    public static PaginationMetaDTO generatePaginationMeta(
            String baseUrl,
            int totalItems,
            int currentPage,
            int pageSize,
            Object queryParams
    ) {
        int totalPages = (int) Math.ceil((double) totalItems / pageSize);

        PaginationMetaLinksDTO links = generatePaginationMetaLinks(
                baseUrl,
                currentPage,
                pageSize,
                totalPages,
                queryParams
        );

        return new PaginationMetaDTO(currentPage, pageSize, totalItems, totalPages, links);
    }

    private static PaginationMetaLinksDTO generatePaginationMetaLinks(
            String baseUrl,
            int currentPage,
            int pageSize,
            int totalPages,
            Object queryParams
    ){
        try {
            PaginationMetaLinksDTO links = new PaginationMetaLinksDTO(
                    getLink(baseUrl, 1, pageSize, queryParams),
                    getLink(baseUrl, currentPage - 1, pageSize, queryParams),
                    getLink(baseUrl, currentPage + 1, pageSize, queryParams),
                    getLink(baseUrl, totalPages, pageSize, queryParams)
            );
            return links;
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    private static String getLink(String baseUrl, int page, int pageSize, Object dto) throws IllegalAccessException {
        if (page < 1 || page > pageSize) {
            return null;
        }

        Map<String, List<String>> params = new HashMap<>();

        for (Class<?> clazz = dto.getClass(); clazz != null; clazz = clazz.getSuperclass()) {
            for (var field : clazz.getDeclaredFields()) {
                field.setAccessible(true);
                Object value = field.get(dto);

                if (value != null) {
                    if (value instanceof Iterable<?>) {
                        for (Object item : (Iterable<?>) value) {
                            params.computeIfAbsent(field.getName(), k -> new ArrayList<>())
                                        .add(String.valueOf(item));
                        }
                    } else {
                        params.computeIfAbsent(field.getName(), k -> new ArrayList<>())
                                .add(String.valueOf(value));
                    }
                }
            }
        }

        String queryString = params.entrySet().stream()
                .flatMap(entry -> entry.getValue().stream()
                        .map(value -> entry.getKey() + "=" + value))
                .collect(Collectors.joining("&"));
        return baseUrl + "?" + queryString;
    }
}
