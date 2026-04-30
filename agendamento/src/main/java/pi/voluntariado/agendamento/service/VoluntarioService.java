package pi.voluntariado.agendamento.service;

import pi.voluntariado.agendamento.dto.voluntario.VoluntarioRequestDTO;
import pi.voluntariado.agendamento.dto.voluntario.VoluntarioResponseDTO;

import java.util.List;

public interface VoluntarioService {
    List<VoluntarioResponseDTO> findAll();
    VoluntarioResponseDTO findById(Long id);
    VoluntarioResponseDTO create(VoluntarioRequestDTO voluntarioDTO);
    VoluntarioResponseDTO update(Long id, VoluntarioRequestDTO voluntarioDTO);
    void delete(Long id);
    Long countParticipantes(int ano, int mes);
    Long countNaoParticipantes(int ano, int mes);
}