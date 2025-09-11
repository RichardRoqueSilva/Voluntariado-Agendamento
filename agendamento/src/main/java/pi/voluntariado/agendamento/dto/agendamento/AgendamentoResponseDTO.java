package pi.voluntariado.agendamento.dto.agendamento;

import pi.voluntariado.agendamento.model.Agendamento;
import pi.voluntariado.agendamento.dto.entidade.EntidadeResponseDTO; // Importe o DTO da Entidade
import pi.voluntariado.agendamento.dto.voluntario.VoluntarioResponseDTO; // Importe o DTO do Voluntário
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors; // Para mapear listas

@Data
@NoArgsConstructor
public class AgendamentoResponseDTO {
    private Long id;
    private EntidadeResponseDTO entidade;
    private LocalDate diasVisita;
    private LocalTime horario; // <<< ALTERADO PARA LocalTime
    private List<VoluntarioResponseDTO> listaParticipantes;

    public AgendamentoResponseDTO(Agendamento agendamento) {
        this.id = agendamento.getId();
        this.entidade = new EntidadeResponseDTO(agendamento.getEntidade());
        this.diasVisita = agendamento.getDiasVisita();
        this.horario = agendamento.getHorario();
        this.listaParticipantes = agendamento.getListaParticipantes().stream()
                .map(VoluntarioResponseDTO::new)
                .collect(Collectors.toList());
    }
}
