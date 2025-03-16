package br.com.guizzo.projectbasic.infra.security;

import br.com.guizzo.projectbasic.shared.interceptors.RequireAbilitiesInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private RequireAbilitiesInterceptor requireAbilitiesInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requireAbilitiesInterceptor);
    }

}