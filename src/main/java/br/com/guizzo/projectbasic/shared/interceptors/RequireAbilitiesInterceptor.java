package br.com.guizzo.projectbasic.shared.interceptors;

import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.annotations.RequireAbilities;
import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class RequireAbilitiesInterceptor implements HandlerInterceptor {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod method) {
            RequireAbilities requireAbilities = method.getMethodAnnotation(RequireAbilities.class);
            if (requireAbilities != null) {
                String email = request.getUserPrincipal().getName();
                Set<String> userAuthorities = userRepository.findFirstByEmailAndDeletedAtIsNull(email).getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toSet());

                String requiredAuthority = String.format("%s_%s", requireAbilities.code(), requireAbilities.action());
                boolean hasAccess = userAuthorities.contains(requiredAuthority);

                if (!hasAccess) {
                    throw new UnauthorizedException("Sem permissões necessarias");
                }
            }
        }
        return true;
    }
}
