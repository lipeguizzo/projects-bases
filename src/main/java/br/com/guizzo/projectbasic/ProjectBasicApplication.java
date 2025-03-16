package br.com.guizzo.projectbasic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class ProjectBasicApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectBasicApplication.class, args);
	}

}
