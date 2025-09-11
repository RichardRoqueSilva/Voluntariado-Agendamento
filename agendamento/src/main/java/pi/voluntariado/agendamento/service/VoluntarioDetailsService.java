package pi.voluntariado.agendamento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pi.voluntariado.agendamento.model.Voluntario;
import pi.voluntariado.agendamento.repository.VoluntarioRepository;
import pi.voluntariado.agendamento.security.VoluntarioDetails;

import java.util.Optional;

@Service
public class VoluntarioDetailsService implements UserDetailsService {

    @Autowired
    private VoluntarioRepository voluntarioRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<Voluntario> voluntario = voluntarioRepository.findByLogin(login);

        return voluntario.map(VoluntarioDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + login));
    }
}