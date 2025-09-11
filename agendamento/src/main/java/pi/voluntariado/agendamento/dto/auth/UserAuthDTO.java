package pi.voluntariado.agendamento.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserAuthDTO {
    @NotBlank(message = "O login é obrigatório")
    private String login;
    @NotBlank(message = "A senha é obrigatória")
    private String senha;
}
