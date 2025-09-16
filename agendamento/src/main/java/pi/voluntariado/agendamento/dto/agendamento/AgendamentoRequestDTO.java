package pi.voluntariado.agendamento.dto.agendamento;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty; // Para a lista de participantes
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.voluntariado.agendamento.enums.StatusAgendamento;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
public class AgendamentoRequestDTO {

    @NotNull(message = "O ID da entidade é obrigatório")
    private Long entidadeId;

    @NotNull(message = "A data do agendamento é obrigatória")
    private LocalDate diasVisita;

    @NotNull(message = "O horário do agendamento é obrigatório")
    @Schema(type = "string", format = "HH:mm", example = "14:30")
    private LocalTime horario;

    @NotEmpty(message = "A lista de participantes não pode ser vazia")
    private List<Long> participantesIds;

    @NotNull(message = "O status do agendamento é obrigatório") // Adiciona validação
    private StatusAgendamento status;

}