package pi.voluntariado.agendamento.dto.voluntario;

import jakarta.validation.constraints.*;
// import jakarta.validation.constraints.NotNull; // <<< REMOVA ESTA LINHA
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.voluntariado.agendamento.enums.UserRole;

@Data
@NoArgsConstructor
public class VoluntarioRequestDTO {

    @NotBlank(message = "O nome é obrigatório")
    private String nome;
    // <<< NOVO: Validação para o campo celular
    @NotBlank(message = "O celular é obrigatório")
    @Pattern(regexp = "^\\(?[1-9]{2}\\)? ?(?:9\\d{4})-?\\d{4}$", message = "Formato de celular inválido (ex: (11)99999-8888 ou 11999998888)")
    private String celular;
    private String observacao;
    @NotBlank(message = "O login é obrigatório")
    private String login;
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String senha;

    @NotBlank(message = "O email é obrigatório") // <<< NOVO CAMPO com validação
    @Email(message = "O email deve ser válido")
    private String email;

    @NotNull(message = "A role é obrigatória") // <<< NOVO CAMPO
    private UserRole role;
}
