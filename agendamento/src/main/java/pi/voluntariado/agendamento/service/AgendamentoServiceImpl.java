package pi.voluntariado.agendamento.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import pi.voluntariado.agendamento.dto.agendamento.AgendamentoRequestDTO;
import pi.voluntariado.agendamento.dto.agendamento.AgendamentoResponseDTO;
import pi.voluntariado.agendamento.enums.DiaDaSemana;
import pi.voluntariado.agendamento.model.Agendamento;
import pi.voluntariado.agendamento.model.Entidade;
import pi.voluntariado.agendamento.model.Voluntario;
import pi.voluntariado.agendamento.repository.AgendamentoRepository;
import pi.voluntariado.agendamento.repository.EntidadeRepository;
import pi.voluntariado.agendamento.repository.VoluntarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgendamentoServiceImpl implements AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;
    @Autowired
    private EntidadeRepository entidadeRepository;
    @Autowired
    private VoluntarioRepository voluntarioRepository;

    @Override
    public List<AgendamentoResponseDTO> findAll() {
        return agendamentoRepository.findAll().stream()
                .map(AgendamentoResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public AgendamentoResponseDTO findById(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com ID: " + id));
        return new AgendamentoResponseDTO(agendamento);
    }

    @Override
    public AgendamentoResponseDTO create(AgendamentoRequestDTO agendamentoDTO) {
        // 1. Consultar e validar a Entidade
        Entidade entidade = entidadeRepository.findById(agendamentoDTO.getEntidadeId())
                .orElseThrow(() -> new RuntimeException("Entidade não encontrada com ID: " + agendamentoDTO.getEntidadeId()));

        // 2. Consultar e validar os Voluntários
        List<Voluntario> participantes = voluntarioRepository.findAllById(agendamentoDTO.getParticipantesIds());
        if (participantes.size() != agendamentoDTO.getParticipantesIds().size()) {
            // Identifica quais IDs não foram encontrados para uma mensagem mais útil
            List<Long> foundIds = participantes.stream().map(Voluntario::getId).collect(Collectors.toList());
            List<Long> missingIds = agendamentoDTO.getParticipantesIds().stream()
                    .filter(id -> !foundIds.contains(id))
                    .collect(Collectors.toList());
            throw new RuntimeException("Um ou mais voluntários não foram encontrados: " + missingIds);
        }

        // 3. Validar o dia da semana do agendamento com os dias permitidos da Entidade
        DayOfWeek diaDaSemanaDoAgendamentoJava = agendamentoDTO.getDiasVisita().getDayOfWeek();
        DiaDaSemana diaAgendadoEnum = DiaDaSemana.fromDayOfWeek(diaDaSemanaDoAgendamentoJava);

        if (!entidade.getDiasVisita().contains(diaAgendadoEnum)) {
            throw new RuntimeException("A entidade '" + entidade.getNome() + "' não permite visitas às " + diaAgendadoEnum.getDescricao() + "s.");
        }

        // 4. Validar o horário do agendamento com a faixa de horário permitida da Entidade
        LocalTime horarioAgendamento = agendamentoDTO.getHorario();
        LocalTime horarioInicioPermitido = entidade.getHorarioInicioVisita();
        LocalTime horarioFimPermitido = entidade.getHorarioFimVisita();

        // Verifica se o horário do agendamento está entre o horário de início e fim (inclusive)
        if (horarioAgendamento.isBefore(horarioInicioPermitido) || horarioAgendamento.isAfter(horarioFimPermitido)) {
            throw new RuntimeException("O horário do agendamento (" + horarioAgendamento + ") está fora da faixa permitida para a entidade '" + entidade.getNome() + "' (" + horarioInicioPermitido + " - " + horarioFimPermitido + ").");
        }


        Agendamento agendamento = new Agendamento();
        agendamento.setEntidade(entidade);
        agendamento.setDiasVisita(agendamentoDTO.getDiasVisita());
        agendamento.setHorario(horarioAgendamento);
        agendamento.setListaParticipantes(participantes);
        agendamento.setStatus(agendamentoDTO.getStatus()); // Adiciona o status

        Agendamento savedAgendamento = agendamentoRepository.save(agendamento);
        return new AgendamentoResponseDTO(savedAgendamento);
    }

    @Override
    public AgendamentoResponseDTO update(Long id, AgendamentoRequestDTO agendamentoDTO) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com ID: " + id));

        // 1. Consultar e validar a Entidade
        Entidade entidade = entidadeRepository.findById(agendamentoDTO.getEntidadeId())
                .orElseThrow(() -> new RuntimeException("Entidade não encontrada com ID: " + agendamentoDTO.getEntidadeId()));

        // 2. Consultar e validar os Voluntários
        List<Voluntario> participantes = voluntarioRepository.findAllById(agendamentoDTO.getParticipantesIds());
        if (participantes.size() != agendamentoDTO.getParticipantesIds().size()) {
            List<Long> foundIds = participantes.stream().map(Voluntario::getId).collect(Collectors.toList());
            List<Long> missingIds = agendamentoDTO.getParticipantesIds().stream()
                    .filter(missingId -> !foundIds.contains(missingId))
                    .collect(Collectors.toList());
            throw new RuntimeException("Um ou mais voluntários não foram encontrados para atualização: " + missingIds);
        }

        // 3. Validar o dia da semana do agendamento com os dias permitidos da Entidade
        DayOfWeek diaDaSemanaDoAgendamentoJava = agendamentoDTO.getDiasVisita().getDayOfWeek();
        DiaDaSemana diaAgendadoEnum = DiaDaSemana.fromDayOfWeek(diaDaSemanaDoAgendamentoJava);

        if (!entidade.getDiasVisita().contains(diaAgendadoEnum)) {
            throw new RuntimeException("A entidade '" + entidade.getNome() + "' não permite visitas às " + diaAgendadoEnum.getDescricao() + "s.");
        }

        // 4. Validar o horário do agendamento com a faixa de horário permitida da Entidade
        LocalTime horarioAgendamento = agendamentoDTO.getHorario();
        LocalTime horarioInicioPermitido = entidade.getHorarioInicioVisita();
        LocalTime horarioFimPermitido = entidade.getHorarioFimVisita();

        if (horarioAgendamento.isBefore(horarioInicioPermitido) || horarioAgendamento.isAfter(horarioFimPermitido)) {
            throw new RuntimeException("O horário do agendamento (" + horarioAgendamento + ") está fora da faixa permitida para a entidade '" + entidade.getNome() + "' (" + horarioInicioPermitido + " - " + horarioFimPermitido + ").");
        }


        agendamento.setId(id); // Garante que o ID esteja presente para a atualização
        agendamento.setEntidade(entidade);
        agendamento.setDiasVisita(agendamentoDTO.getDiasVisita());
        agendamento.setHorario(horarioAgendamento);
        agendamento.setListaParticipantes(participantes);
        agendamento.setStatus(agendamentoDTO.getStatus()); // Atualiza o status

        Agendamento updatedAgendamento = agendamentoRepository.save(agendamento);
        return new AgendamentoResponseDTO(updatedAgendamento);
    }

    @Override
    public void delete(Long id) {
        if (!agendamentoRepository.existsById(id)) {
            throw new RuntimeException("Agendamento não encontrado com ID: " + id);
        }
        agendamentoRepository.deleteById(id);
    }
}