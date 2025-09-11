package pi.voluntariado.agendamento.dto.entidade;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import pi.voluntariado.agendamento.enums.DiaDaSemana;

import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
public class EntidadeRequestDTO {

    // private Long id; // ID não é enviado na criação, mas pode ser se o DataLoader precisar
    @NotBlank(message = "O nome da entidade é obrigatório")
    private String nome;
    @NotBlank(message = "O endereço é obrigatório")
    private String endereco;
    private String responsavel;
    private String telefone;
    @NotNull(message = "Os dias de visita são obrigatórios")
    private List<DiaDaSemana> diasVisita;

    @NotNull(message = "O horário de início da visita é obrigatório")
    @Schema(type = "string", format = "HH:mm", example = "09:00") // <<< Adicione esta anotação
    private LocalTime horarioInicioVisita;

    @NotNull(message = "O horário de fim da visita é obrigatório")
    @Schema(type = "string", format = "HH:mm", example = "17:00")
    private LocalTime horarioFimVisita;
    // private String horarioVisita; // <<< REMOVA ESTE CAMPO
}
