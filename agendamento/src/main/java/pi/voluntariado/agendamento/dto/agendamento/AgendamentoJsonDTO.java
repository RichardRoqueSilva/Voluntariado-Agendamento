package pi.voluntariado.agendamento.dto.agendamento;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import pi.voluntariado.agendamento.enums.StatusAgendamento;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoJsonDTO {
    private Long id;
    private String nome;
    private LocalDate diasVisita;
    private LocalTime horario;
    private List<String> listaParticipantes;
    private StatusAgendamento status; // Novo campo para o status
}