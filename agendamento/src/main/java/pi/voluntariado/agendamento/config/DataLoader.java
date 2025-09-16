package pi.voluntariado.agendamento.config;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pi.voluntariado.agendamento.dto.agendamento.AgendamentoJsonDTO;
import pi.voluntariado.agendamento.enums.StatusAgendamento;
import pi.voluntariado.agendamento.model.Agendamento;
import pi.voluntariado.agendamento.model.DbJsonData;
import pi.voluntariado.agendamento.model.Entidade;
import pi.voluntariado.agendamento.model.Voluntario;
import pi.voluntariado.agendamento.repository.AgendamentoRepository;
import pi.voluntariado.agendamento.repository.EntidadeRepository;
import pi.voluntariado.agendamento.repository.VoluntarioRepository;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
@Component
@Profile("!test")
public class DataLoader implements CommandLineRunner {

    private final VoluntarioRepository voluntarioRepository;
    private final EntidadeRepository entidadeRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(VoluntarioRepository voluntarioRepository,
                      EntidadeRepository entidadeRepository,
                      AgendamentoRepository agendamentoRepository,
                      PasswordEncoder passwordEncoder) {
        this.voluntarioRepository = voluntarioRepository;
        this.entidadeRepository = entidadeRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (voluntarioRepository.count() == 0 && entidadeRepository.count() == 0 && agendamentoRepository.count() == 0) {
            System.out.println("Carregando dados do db.json para o H2...");
            try (InputStream inputStream = new ClassPathResource("db.json").getInputStream()) {
                DbJsonData dataToLoad = objectMapper.readValue(inputStream, DbJsonData.class);

                // 1. Salvar Voluntarios (DEIXANDO O BANCO GERAR OS IDs)
                List<Voluntario> savedVoluntarios = new ArrayList<>();
                for (Voluntario v : dataToLoad.getVoluntarios()) {
                    v.setId(null); // <--- FORÇA O ID A SER NULL PARA O BANCO GERAR UM NOVO ID
                    v.setSenha(passwordEncoder.encode(v.getSenha()));
                    Voluntario saved = voluntarioRepository.save(v);
                    savedVoluntarios.add(saved);
                }
                // Mapeia por NOME para referenciar posteriormente
                Map<String, Voluntario> voluntarioMap = savedVoluntarios.stream()
                        .collect(Collectors.toMap(Voluntario::getNome, Function.identity()));


                // 2. Salvar Entidades (DEIXANDO O BANCO GERAR OS IDs)
                List<Entidade> savedEntidades = new ArrayList<>();
                for (Entidade e : dataToLoad.getEntidades()) {
                    e.setId(null); // <--- FORÇA O ID A SER NULL PARA O BANCO GERAR UM NOVO ID
                    Entidade saved = entidadeRepository.save(e);
                    savedEntidades.add(saved);
                }
                // Mapeia por NOME para referenciar posteriormente
                Map<String, Entidade> entidadeMap = savedEntidades.stream()
                        .collect(Collectors.toMap(Entidade::getNome, Function.identity()));


                // 3. Salvar Agendamentos (com ID gerado pelo banco via SEQUENCE)
                List<Agendamento> agendamentosToPersist = new ArrayList<>();
                for (AgendamentoJsonDTO jsonDto : dataToLoad.getAgendamentos()) {
                    Agendamento agendamento = new Agendamento();
                    agendamento.setId(null); // ID do agendamento é gerado pela sequência (sua entidade Agendamento mantém GenerationType.SEQUENCE)

                    // Obtém a entidade pelo NOME (pois os IDs originais do JSON foram ignorados)
                    Entidade entidade = entidadeMap.get(jsonDto.getNome());
                    if (entidade == null) {
                        System.err.println("Entidade '" + jsonDto.getNome() + "' não encontrada para agendamento. Pulando.");
                        continue;
                    }
                    agendamento.setEntidade(entidade);

                    agendamento.setDiasVisita(jsonDto.getDiasVisita());
                    agendamento.setHorario(jsonDto.getHorario());

                    List<Voluntario> participantes = jsonDto.getListaParticipantes().stream()
                            .map(voluntarioMap::get) // Obtém do mapa que contém os voluntários salvos
                            .filter(v -> {
                                if (v == null) {
                                    System.err.println("Participante para agendamento da entidade '" + jsonDto.getNome() + "' não encontrado. Pulando.");
                                }
                                return v != null;
                            })
                            .collect(Collectors.toList());
                    agendamento.setListaParticipantes(participantes);

                    if (jsonDto.getStatus() != null) {
                        agendamento.setStatus(jsonDto.getStatus());
                    } else {
                        System.err.println("Status não especificado ou inválido para agendamento da entidade '" + jsonDto.getNome() + "'. Usando AGUARDANDO_CONFIRMACAO como padrão.");
                        agendamento.setStatus(StatusAgendamento.AGUARDANDO_CONFIRMACAO);
                    }
                    agendamentosToPersist.add(agendamento);
                }
                agendamentoRepository.saveAll(agendamentosToPersist);
                System.out.println("Dados do db.json carregados com sucesso!");
            } catch (Exception e) {
                System.err.println("Erro ao carregar dados do db.json: " + e.getMessage());
                throw e; // Lançar a exceção para que o Spring a capture e reporte corretamente.
            }
        } else {
            System.out.println("Banco de dados H2 já contém dados. Pulando carregamento do db.json.");
        }
    }
}