package pi.voluntariado.agendamento.service;

import org.springframework.security.crypto.password.PasswordEncoder;
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
    @Autowired
    private PasswordEncoder passwordEncoder; // <<< Injetar PasswordEncoder

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
        voluntario.setNome(voluntarioDTO.getNome());
        voluntario.setCelular(voluntarioDTO.getCelular());
        voluntario.setObservacao(voluntarioDTO.getObservacao());
        voluntario.setLogin(voluntarioDTO.getLogin());
        voluntario.setEmail(voluntarioDTO.getEmail()); // <<< Mapear email
        voluntario.setRole(voluntarioDTO.getRole());   // <<< Mapear role
        voluntario.setSenha(passwordEncoder.encode(voluntarioDTO.getSenha())); // <<< Criptografar a senha

        Voluntario savedVoluntario = voluntarioRepository.save(voluntario);
        return new VoluntarioResponseDTO(savedVoluntario);
    }

    @Override
    public VoluntarioResponseDTO update(Long id, VoluntarioRequestDTO voluntarioDTO) {
        Voluntario voluntario = voluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voluntário não encontrado com ID: " + id));

        voluntario.setId(id);
        voluntario.setNome(voluntarioDTO.getNome());
        voluntario.setCelular(voluntarioDTO.getCelular());
        voluntario.setObservacao(voluntarioDTO.getObservacao());
        voluntario.setLogin(voluntarioDTO.getLogin());
        voluntario.setEmail(voluntarioDTO.getEmail()); // <<< Mapear email
        voluntario.setRole(voluntarioDTO.getRole());   // <<< Mapear role

        // A senha só deve ser atualizada se for fornecida no DTO (e criptografada novamente)
        if (voluntarioDTO.getSenha() != null && !voluntarioDTO.getSenha().isEmpty()) {
            voluntario.setSenha(passwordEncoder.encode(voluntarioDTO.getSenha()));
        }

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