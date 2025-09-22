package pi.voluntariado.agendamento.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
@Slf4j
public class WebConfig implements WebMvcConfigurer {

    @Value("${voluntariado.origenspermitidas}")
    private List<String> origensPermitidas;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        log.info("Origens permitidas: {}", String.join(",", origensPermitidas));
        registry.addMapping("/**") // Permite CORS para todos os endpoints
                .allowedOrigins(origensPermitidas.toArray(new String[]{})) // Permite requisições do Angular em desenvolvimento
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT") // Métodos permitidos
                .allowedHeaders("*") // Permite todos os cabeçalhos
                .allowCredentials(true); // Permite o envio de cookies/cabeçalhos de autenticação
    }
}