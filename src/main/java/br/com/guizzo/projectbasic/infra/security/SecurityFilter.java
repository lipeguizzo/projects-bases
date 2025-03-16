package br.com.guizzo.projectbasic.infra.security;

import br.com.guizzo.projectbasic.modules.user.services.UserFindByEmailService;
import br.com.guizzo.projectbasic.shared.domain.dto.ErrorResponseDTO;
import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;
import br.com.guizzo.projectbasic.shared.services.TokenVerifyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenVerifyService tokenVerifyService;

    @Autowired
    private UserFindByEmailService userFindByEmailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException {

        try{
            String uri = request.getRequestURI();
            String token = this.recoveryToken(request);

            if(PublicRoutes.isPublicRoute(uri)) {
                filterChain.doFilter(request, response);
                return;
            }

            if (token != null && !token.isBlank()) {
                String email = this.tokenVerifyService.execute(token);
                UserDetails user = this.userFindByEmailService.execute(email);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(auth);
            }else{
                throw new UnauthorizedException("Token inválido!");
            }

            filterChain.doFilter(request, response);

        }catch (UnauthorizedException e) {
            handleException(response, e, "Unauthorized!", HttpStatus.UNAUTHORIZED);
        }catch (Exception e) {
            handleException(response, e, "Bad Request!", HttpStatus.BAD_REQUEST);
        }
    }

    private String recoveryToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if(authHeader == null) return null;

        return authHeader.replace("Bearer", "");
    }

    private void handleException(HttpServletResponse response, Exception e, String message, HttpStatus status) throws IOException {
        ErrorResponseDTO dto = new ErrorResponseDTO(status.value(), message, List.of(e.getMessage()));
        response.setStatus(status.value());
        response.setContentType("application/json");

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(dto);

        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }

}