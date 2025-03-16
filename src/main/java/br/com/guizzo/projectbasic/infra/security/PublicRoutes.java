package br.com.guizzo.projectbasic.infra.security;

import java.util.List;

public class PublicRoutes {

    public static final List<String> GET = List.of(
            "/files/{uuid}", "/files/public/{uuid}"
    );

    public static final List<String> POST = List.of(
            "/auth/login", "/auth/refresh", "/auth/register", "/auth/recover-password"
    );

    public static final List<String> PUT = List.of();

    public static final List<String> PATCH = List.of(
            "/auth/reset-password"
    );

    public static final List<String> DELETE = List.of();

    public static final List<String> DOCS = List.of(
            "/swagger-ui", "/v3/api-docs", "/doc"
    );

    public static boolean isPublicRoute(String uri){
        if ( PublicRoutes.GET.stream().anyMatch(uri::equalsIgnoreCase) ) return true;

        if ( PublicRoutes.POST.stream().anyMatch(uri::equalsIgnoreCase) ) return true;

        if ( PublicRoutes.PUT.stream().anyMatch(uri::equalsIgnoreCase) ) return true;

        if ( PublicRoutes.PATCH.stream().anyMatch(uri::equalsIgnoreCase) ) return true;

        if ( PublicRoutes.DELETE.stream().anyMatch(uri::equalsIgnoreCase) ) return true;

        if ( PublicRoutes.DOCS.stream().anyMatch(uri::startsWith) ) return true;

        return false;
    }
}
