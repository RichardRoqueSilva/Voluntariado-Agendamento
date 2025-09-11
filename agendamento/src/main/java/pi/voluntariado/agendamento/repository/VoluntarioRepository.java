package pi.voluntariado.agendamento.repository;

import pi.voluntariado.agendamento.model.Voluntario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoluntarioRepository extends JpaRepository<Voluntario, Long> { }
