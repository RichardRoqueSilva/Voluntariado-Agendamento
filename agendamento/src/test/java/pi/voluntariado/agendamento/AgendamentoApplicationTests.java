package pi.voluntariado.agendamento;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
// REMOVER: import org.springframework.context.annotation.Bean;
// REMOVER: import org.springframework.boot.test.context.TestConfiguration;
// REMOVER: import org.springframework.boot.test.mock.mockito.MockBean;
// REMOVER: import org.springframework.security.authentication.AuthenticationManager;
// REMOVER: import org.mockito.Mockito;


@SpringBootTest
@ActiveProfiles("test")
class AgendamentoApplicationTests {

    // REMOVER ESTA CLASSE ANINHADA TestSecurityConfigForTests SE ELA EXISTE AQUI

    @Test
    void contextLoads() {
        // Este teste verifica se o contexto da aplicação Spring Boot pode ser carregado
        // sem lançar exceções.
    }

}
