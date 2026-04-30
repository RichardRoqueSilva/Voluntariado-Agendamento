package pi.voluntariado.agendamento.service;

import pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO;

import java.util.List;

public interface DashboardService {
    Double calcularTaxaParticipacao(int ano, int mes);
    Double calcularHorasTotais(int ano, int mes);
    List<DashboardBarDataDTO> getVisitasPorEntidade(int ano, int mes);
    List<DashboardBarDataDTO> getVisitasPorVoluntario(int ano, int mes);

    // Novos métodos para o DashboardCronologicoController
    List<DashboardBarDataDTO> getVisitasPorDiaSemana(int ano, int mes);
    List<DashboardBarDataDTO> getVisitasPorPeriodo(int ano, int mes);
}
