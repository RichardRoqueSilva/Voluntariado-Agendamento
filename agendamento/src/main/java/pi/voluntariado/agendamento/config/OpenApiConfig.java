package pi.voluntariado.agendamento.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Agendamento de Voluntariado")
                        .version("1.0.0")
                        .description("Documentação da API para o projeto de voluntariado e agendamentos.")
                        .termsOfService("http://swagger.io/terms/")
                        .contact(new Contact()
                                .name("Richard Roque da Silva")
                                .url("https://github.com/SeuUsuarioGithub") // Substitua pelo seu GitHub
                                .email("seu.email@exemplo.com")) // Substitua pelo seu email
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")));
    }
}