package pi.voluntariado.agendamento.repository;

import pi.voluntariado.agendamento.model.Entidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntidadeRepository extends JpaRepository<Entidade, Long> { }