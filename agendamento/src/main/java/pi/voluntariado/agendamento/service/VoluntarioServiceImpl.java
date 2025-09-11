package pi.voluntariado.agendamento.service;

import pi.voluntariado.agendamento.dto.voluntario.VoluntarioRequestDTO;
import pi.voluntariado.agendamento.dto.voluntario.VoluntarioResponseDTO;
import pi.voluntariado.agendamento.model.Voluntario;
import pi.voluntariado.agendamento.repository.VoluntarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoluntarioServiceImpl implements VoluntarioService {

    @Autowired
    private VoluntarioRepository voluntarioRepository;

    @Override
    public List<VoluntarioResponseDTO> findAll() {
        return voluntarioRepository.findAll().stream()
                .map(VoluntarioResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public VoluntarioResponseDTO findById(Long id) {
        Voluntario voluntario = voluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voluntário não encontrado com ID: " + id));
        return new VoluntarioResponseDTO(voluntario);
    }

    @Override
    public VoluntarioResponseDTO create(VoluntarioRequestDTO voluntarioDTO) {
        Voluntario voluntario = new Voluntario();
        // voluntario.setId(voluntarioDTO.getId()); // <<< REMOVA ESTA LINHA
        voluntario.setNome(voluntarioDTO.getNome());
        voluntario.setCelular(voluntarioDTO.getCelular());
        voluntario.setObservacao(voluntarioDTO.getObservacao());
        voluntario.setLogin(voluntarioDTO.getLogin());
        voluntario.setSenha(voluntarioDTO.getSenha());

        Voluntario savedVoluntario = voluntarioRepository.save(voluntario);
        return new VoluntarioResponseDTO(savedVoluntario);
    }

    @Override
    public VoluntarioResponseDTO update(Long id, VoluntarioRequestDTO voluntarioDTO) {
        Voluntario voluntario = voluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voluntário não encontrado com ID: " + id));

        voluntario.setId(id); // O ID vem do path, não do DTO de request
        voluntario.setNome(voluntarioDTO.getNome());
        voluntario.setCelular(voluntarioDTO.getCelular());
        voluntario.setObservacao(voluntarioDTO.getObservacao());
        voluntario.setLogin(voluntarioDTO.getLogin());
        voluntario.setSenha(voluntarioDTO.getSenha());

        Voluntario updatedVoluntario = voluntarioRepository.save(voluntario);
        return new VoluntarioResponseDTO(updatedVoluntario);
    }

    @Override
    public void delete(Long id) {
        if (!voluntarioRepository.existsById(id)) {
            throw new RuntimeException("Voluntário não encontrado com ID: " + id);
        }
        voluntarioRepository.deleteById(id);
    }
}