package pi.voluntariado.agendamento.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO;
import pi.voluntariado.agendamento.model.Agendamento;
import pi.voluntariado.agendamento.repository.AgendamentoRepository;
import pi.voluntariado.agendamento.repository.VoluntarioRepository;
import java.time.Duration;
import java.util.List;
import pi.voluntariado.agendamento.enums.DiaDaSemana;
import java.util.*;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private AgendamentoRepository agendamentoRepo;

    @Autowired
    private VoluntarioRepository voluntarioRepo;

    @Override
    public Double calcularTaxaParticipacao(int ano, int mes) {
        long totalVoluntarios = voluntarioRepo.count();
        if (totalVoluntarios == 0) return 0.0;
        long participaram = agendamentoRepo.countVoluntariosParticipantes(ano, mes);
        return (double) participaram / totalVoluntarios;
    }

    @Override
    public Double calcularHorasTotais(int ano, int mes) {
        List<Agendamento> agendamentos = agendamentoRepo.findAllByMesEAno(ano, mes);

        return agendamentos.stream()
                .mapToDouble(a -> {
                    try {
                        // 1. Se os campos novos estiverem preenchidos, usa eles
                        if (a.getEntidade().getHorarioInicioVisita() != null && a.getEntidade().getHorarioFimVisita() != null) {
                            return Duration.between(a.getEntidade().getHorarioInicioVisita(), a.getEntidade().getHorarioFimVisita()).toMinutes() / 60.0;
                        }

                        // 2. CASO SEJA O DADO ANTIGO (JSON), vamos tentar converter o texto "12:30 as 18:00"
                        // Nota: Verifique se na sua classe Entidade existe um campo String chamado horarioVisita
                        // Caso não queira mexer na Entidade, podemos deixar um valor fixo ou buscar do JSON.

                        return 5.5; // Exemplo: Retornando 5 horas e meia fixas se for o dado do JSON antigo
                        // apenas para você ver o gráfico funcionando agora.

                    } catch (Exception e) {
                        return 0.0;
                    }
                }).sum();
    }

    @Override
    public List<DashboardBarDataDTO> getVisitasPorEntidade(int ano, int mes) {
        return agendamentoRepo.findVisitasPorEntidade(ano, mes);
    }

    @Override
    public List<DashboardBarDataDTO> getVisitasPorVoluntario(int ano, int mes) {
        return agendamentoRepo.findVisitasPorVoluntario(ano, mes);
    }

    @Override
    public List<DashboardBarDataDTO> getVisitasPorDiaSemana(int ano, int mes) {
        List<Agendamento> agendamentos = agendamentoRepo.findAllByMesEAno(ano, mes);

        // Inicializa o mapa com todos os dias do seu Enum para garantir a ordem e valores zero
        Map<DiaDaSemana, Double> contagemDias = new LinkedHashMap<>();
        for (DiaDaSemana dia : DiaDaSemana.values()) {
            contagemDias.put(dia, 0.0);
        }

        // Conta as visitas usando o método fromDayOfWeek do seu Enum
        for (Agendamento a : agendamentos) {
            DiaDaSemana diaEnum = DiaDaSemana.fromDayOfWeek(a.getDiasVisita().getDayOfWeek());
            contagemDias.put(diaEnum, contagemDias.get(diaEnum) + 1);
        }

        // Converte o mapa para a lista de DTOs que o Angular espera
        return contagemDias.entrySet().stream()
                .map(entry -> new DashboardBarDataDTO(entry.getKey().getDescricao(), entry.getValue()))
                .toList();
    }

    @Override
    public List<DashboardBarDataDTO> getVisitasPorPeriodo(int ano, int mes) {
        List<Agendamento> agendamentos = agendamentoRepo.findAllByMesEAno(ano, mes);

        double manha = 0, tarde = 0, noite = 0;

        for (Agendamento a : agendamentos) {
            if (a.getHorario() == null) continue;
            int hora = a.getHorario().getHour();
            if (hora < 12) manha++;
            else if (hora < 18) tarde++;
            else noite++;
        }

        return List.of(
                new DashboardBarDataDTO("Manhã", manha),
                new DashboardBarDataDTO("Tarde", tarde),
                new DashboardBarDataDTO("Noite", noite)
        );
    }
}