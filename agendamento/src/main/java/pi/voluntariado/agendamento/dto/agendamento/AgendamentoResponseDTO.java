package pi.voluntariado.agendamento.dto.agendamento;


import pi.voluntariado.agendamento.enums.StatusAgendamento;
import pi.voluntariado.agendamento.model.Agendamento;
import pi.voluntariado.agendamento.dto.entidade.EntidadeResponseDTO; // Importe o DTO da Entidade
import pi.voluntariado.agendamento.dto.voluntario.VoluntarioResponseDTO; // Importe o DTO do Voluntário
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.voluntariado.agendamento.model.Voluntario;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors; // Para mapear listas

@Data
@NoArgsConstructor
public class AgendamentoResponseDTO {
    private Long id;
    private EntidadeResponseDTO entidade; // Assumindo que esta classe existe
    private LocalDate diasVisita;
    private LocalTime horario;
    private List<VoluntarioResponseDTO> listaParticipantes; // Assumindo que esta classe existe
    private StatusAgendamento status; // Novo campo para o status

    public AgendamentoResponseDTO(Agendamento agendamento) {
        this.id = agendamento.getId();
        // CUIDADO: Crie EntidadeResponseDTO e VoluntarioResponseDTO se ainda não existirem
        this.entidade = new EntidadeResponseDTO(agendamento.getEntidade());
        this.diasVisita = agendamento.getDiasVisita();
        this.horario = agendamento.getHorario();
        this.listaParticipantes = agendamento.getListaParticipantes().stream()
                .map(VoluntarioResponseDTO::new) // Assumindo construtor em VoluntarioResponseDTO
                .collect(Collectors.toList());
        this.status = agendamento.getStatus(); // Define o status
    }
}