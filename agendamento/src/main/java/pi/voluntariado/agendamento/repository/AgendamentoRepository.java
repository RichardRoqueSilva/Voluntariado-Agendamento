package pi.voluntariado.agendamento.repository;

import pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO;
import pi.voluntariado.agendamento.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pi.voluntariado.agendamento.model.Agendamento;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    @Query("SELECT COUNT(DISTINCT a.entidade.id) FROM Agendamento a WHERE YEAR(a.diasVisita) = :ano AND MONTH(a.diasVisita) = :mes")
    Long countEntidadesVisitadas(@Param("ano") int ano, @Param("mes") int mes);

    @Query("SELECT COUNT(DISTINCT v.id) FROM Agendamento a JOIN a.listaParticipantes v WHERE YEAR(a.diasVisita) = :ano AND MONTH(a.diasVisita) = :mes")
    Long countVoluntariosParticipantes(@Param("ano") int ano, @Param("mes") int mes);

    @Query("SELECT a FROM Agendamento a WHERE YEAR(a.diasVisita) = :ano AND MONTH(a.diasVisita) = :mes")
    List<Agendamento> findAllByMesEAno(@Param("ano") int ano, @Param("mes") int mes);

    @Query("SELECT new pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO(a.entidade.nome, COUNT(a.id) * 1.0) " +
            "FROM Agendamento a WHERE YEAR(a.diasVisita) = :ano AND MONTH(a.diasVisita) = :mes GROUP BY a.entidade.nome")
    List<DashboardBarDataDTO> findVisitasPorEntidade(@Param("ano") int ano, @Param("mes") int mes);

    @Query("SELECT new pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO(v.nome, COUNT(a.id) * 1.0) " +
            "FROM Agendamento a JOIN a.listaParticipantes v WHERE YEAR(a.diasVisita) = :ano AND MONTH(a.diasVisita) = :mes GROUP BY v.nome")
    List<DashboardBarDataDTO> findVisitasPorVoluntario(@Param("ano") int ano, @Param("mes") int mes);
}