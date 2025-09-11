package pi.voluntariado.agendamento.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.voluntariado.agendamento.enums.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    private String message;
    private String login;
    private UserRole role; // Retorna a role do usuário
    // Em uma aplicação real, aqui também haveria um token JWT
}
