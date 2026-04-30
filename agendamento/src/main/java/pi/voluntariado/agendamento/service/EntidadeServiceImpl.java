package pi.voluntariado.agendamento.service;

import pi.voluntariado.agendamento.dto.entidade.EntidadeRequestDTO;
import pi.voluntariado.agendamento.dto.entidade.EntidadeResponseDTO;
import pi.voluntariado.agendamento.model.Entidade;
import pi.voluntariado.agendamento.repository.AgendamentoRepository;
import pi.voluntariado.agendamento.repository.EntidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntidadeServiceImpl implements EntidadeService {

    @Autowired
    private EntidadeRepository entidadeRepository;

    @Override
    public List<EntidadeResponseDTO> findAll() {
        return entidadeRepository.findAll().stream()
                .map(EntidadeResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public EntidadeResponseDTO findById(Long id) {
        Entidade entidade = entidadeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entidade não encontrada com ID: " + id));
        return new EntidadeResponseDTO(entidade);
    }

    @Override
    public EntidadeResponseDTO create(EntidadeRequestDTO entidadeDTO) {
        // Validação: Horário de início deve ser antes do horário de fim
        if (entidadeDTO.getHorarioInicioVisita().isAfter(entidadeDTO.getHorarioFimVisita())) {
            throw new RuntimeException("O horário de início da visita não pode ser posterior ao horário de fim.");
        }

        Entidade entidade = new Entidade();
        // entidade.setId(entidadeDTO.getId()); // ID não é enviado na criação
        entidade.setNome(entidadeDTO.getNome());
        entidade.setEndereco(entidadeDTO.getEndereco());
        entidade.setResponsavel(entidadeDTO.getResponsavel());
        entidade.setTelefone(entidadeDTO.getTelefone());
        entidade.setDiasVisita(entidadeDTO.getDiasVisita());
        entidade.setHorarioInicioVisita(entidadeDTO.getHorarioInicioVisita()); // <<< Mapeia o novo campo
        entidade.setHorarioFimVisita(entidadeDTO.getHorarioFimVisita());     // <<< Mapeia o novo campo

        Entidade savedEntidade = entidadeRepository.save(entidade);
        return new EntidadeResponseDTO(savedEntidade);
    }

    @Override
    public EntidadeResponseDTO update(Long id, EntidadeRequestDTO entidadeDTO) {
        Entidade entidade = entidadeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entidade não encontrada com ID: " + id));

        // Validação: Horário de início deve ser antes do horário de fim
        if (entidadeDTO.getHorarioInicioVisita().isAfter(entidadeDTO.getHorarioFimVisita())) {
            throw new RuntimeException("O horário de início da visita não pode ser posterior ao horário de fim.");
        }

        entidade.setId(id); // ID vem do path
        entidade.setNome(entidadeDTO.getNome());
        entidade.setEndereco(entidadeDTO.getEndereco());
        entidade.setResponsavel(entidadeDTO.getResponsavel());
        entidade.setTelefone(entidadeDTO.getTelefone());
        entidade.setDiasVisita(entidadeDTO.getDiasVisita());
        entidade.setHorarioInicioVisita(entidadeDTO.getHorarioInicioVisita()); // <<< Mapeia o novo campo
        entidade.setHorarioFimVisita(entidadeDTO.getHorarioFimVisita());     // <<< Mapeia o novo campo

        Entidade updatedEntidade = entidadeRepository.save(entidade);
        return new EntidadeResponseDTO(updatedEntidade);
    }

    @Override
    public void delete(Long id) {
        if (!entidadeRepository.existsById(id)) {
            throw new RuntimeException("Entidade não encontrada com ID: " + id);
        }
        entidadeRepository.deleteById(id);
    }

    @Autowired private AgendamentoRepository agendamentoRepository;
    @Override
    public Long countVisitadas(int ano, int mes) {
        return agendamentoRepository.countEntidadesVisitadas(ano, mes);
    }
}