package pi.voluntariado.agendamento.dto.agendamento;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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
    private LocalTime horario; // <<< ALTERADO PARA LocalTime
    private List<String> listaParticipantes;
}