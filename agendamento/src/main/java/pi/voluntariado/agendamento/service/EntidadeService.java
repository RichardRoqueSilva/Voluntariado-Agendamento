package pi.voluntariado.agendamento.service;

import pi.voluntariado.agendamento.dto.entidade.EntidadeRequestDTO;
import pi.voluntariado.agendamento.dto.entidade.EntidadeResponseDTO;

import java.util.List;

public interface EntidadeService {
    List<EntidadeResponseDTO> findAll();
    EntidadeResponseDTO findById(Long id);
    EntidadeResponseDTO create(EntidadeRequestDTO entidadeDTO);
    EntidadeResponseDTO update(Long id, EntidadeRequestDTO entidadeDTO);
    void delete(Long id);
}