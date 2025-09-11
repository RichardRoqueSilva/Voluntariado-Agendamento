package pi.voluntariado.agendamento.dto.entidade;

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

    @NotNull(message = "O horário de início da visita é obrigatório") // <<< NOVO CAMPO
    private LocalTime horarioInicioVisita;
    @NotNull(message = "O horário de fim da visita é obrigatório")   // <<< NOVO CAMPO
    private LocalTime horarioFimVisita;
    // private String horarioVisita; // <<< REMOVA ESTE CAMPO
}
