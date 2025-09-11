package pi.voluntariado.agendamento.dto.voluntario;

import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull; // <<< REMOVA ESTA LINHA
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoluntarioRequestDTO {

    // private Long id; // <<< REMOVA ESTE CAMPO
    @NotBlank(message = "O nome é obrigatório")
    private String nome;
    private String celular;
    private String observacao;
    @NotBlank(message = "O login é obrigatório")
    private String login;
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String senha;
}
