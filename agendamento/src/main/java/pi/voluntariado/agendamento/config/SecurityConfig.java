package pi.voluntariado.agendamento.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Desativa CSRF (CUIDADO EM PRODUÇÃO!)
                .authorizeHttpRequests(authorize -> authorize
                        // Permite acesso ao console H2
                        .requestMatchers("/h2-console/**").permitAll()
                        // Permite acesso a todos os endpoints da sua API (para testes iniciais)
                        .requestMatchers("/api/**").permitAll()
                        // Permite acesso aos endpoints do Swagger UI e OpenAPI
                        .requestMatchers("/swagger-ui.html").permitAll() // <<< ADICIONE ESTA LINHA ESPECIFICAMENTE
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/swagger-resources/**").permitAll()
                        .requestMatchers("/webjars/**").permitAll()
                        .anyRequest().authenticated() // Qualquer outra requisição requer autenticação
                )
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin())); // Necessário para o console H2 em iframes

        return http.build();
    }
}