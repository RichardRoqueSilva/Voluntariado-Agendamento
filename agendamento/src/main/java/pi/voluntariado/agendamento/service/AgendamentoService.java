package pi.voluntariado.agendamento.service;

import pi.voluntariado.agendamento.dto.agendamento.AgendamentoRequestDTO;
import pi.voluntariado.agendamento.dto.agendamento.AgendamentoResponseDTO;

import java.util.List;
public interface AgendamentoService {
    List<AgendamentoResponseDTO> findAll();
    AgendamentoResponseDTO findById(Long id);
    AgendamentoResponseDTO create(AgendamentoRequestDTO agendamentoDTO);
    AgendamentoResponseDTO update(Long id, AgendamentoRequestDTO agendamentoDTO);
    void delete(Long id);
}