package pi.voluntariado.agendamento.config;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pi.voluntariado.agendamento.model.Agendamento;
import pi.voluntariado.agendamento.model.DbJsonData;
import pi.voluntariado.agendamento.model.Entidade;
import pi.voluntariado.agendamento.model.Voluntario;
import pi.voluntariado.agendamento.repository.AgendamentoRepository;
import pi.voluntariado.agendamento.repository.EntidadeRepository;
import pi.voluntariado.agendamento.repository.VoluntarioRepository;

import java.io.InputStream;
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
    private final PasswordEncoder passwordEncoder; // <<< Injetar PasswordEncoder

    public DataLoader(VoluntarioRepository voluntarioRepository,
                      EntidadeRepository entidadeRepository,
                      AgendamentoRepository agendamentoRepository,
                      PasswordEncoder passwordEncoder) { // <<< Injetar
        this.voluntarioRepository = voluntarioRepository;
        this.entidadeRepository = entidadeRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        this.passwordEncoder = passwordEncoder; // <<< Atribuir
    }

    @Override
    public void run(String... args) throws Exception {
        if (voluntarioRepository.count() == 0 && entidadeRepository.count() == 0 && agendamentoRepository.count() == 0) {
            System.out.println("Carregando dados do db.json para o H2...");
            try (InputStream inputStream = new ClassPathResource("db.json").getInputStream()) {
                DbJsonData dataToLoad = objectMapper.readValue(inputStream, DbJsonData.class);

                // 1. Salvar Voluntarios (criptografando a senha)
                List<Voluntario> savedVoluntarios = dataToLoad.getVoluntarios().stream().map(v -> {
                    v.setId(null);
                    v.setSenha(passwordEncoder.encode(v.getSenha())); // <<< Criptografa a senha aqui
                    return voluntarioRepository.save(v);
                }).collect(Collectors.toList());
                Map<String, Voluntario> voluntarioMap = savedVoluntarios.stream()
                        .collect(Collectors.toMap(Voluntario::getNome, Function.identity()));

                // 2. Salvar Entidades
                List<Entidade> savedEntidades = dataToLoad.getEntidades().stream().map(e -> {
                    e.setId(null);
                    return entidadeRepository.save(e);
                }).collect(Collectors.toList());
                Map<String, Entidade> entidadeMap = savedEntidades.stream()
                        .collect(Collectors.toMap(Entidade::getNome, Function.identity()));

                // 3. Salvar Agendamentos
                dataToLoad.getAgendamentos().forEach(jsonDto -> {
                    Agendamento agendamento = new Agendamento();
                    agendamento.setId(null);

                    Entidade entidade = entidadeMap.get(jsonDto.getNome());
                    if (entidade == null) {
                        System.err.println("Entidade '" + jsonDto.getNome() + "' não encontrada para agendamento. Pulando.");
                        return;
                    }
                    agendamento.setEntidade(entidade);

                    agendamento.setDiasVisita(jsonDto.getDiasVisita());
                    agendamento.setHorario(jsonDto.getHorario());

                    List<Voluntario> participantes = jsonDto.getListaParticipantes().stream()
                            .map(voluntarioMap::get)
                            .filter(v -> {
                                if (v == null) {
                                    System.err.println("Participante não encontrado para agendamento: " + jsonDto.getNome() + ". Pulando.");
                                }
                                return v != null;
                            })
                            .collect(Collectors.toList());
                    agendamento.setListaParticipantes(participantes);

                    agendamentoRepository.save(agendamento);
                });

                System.out.println("Dados do db.json carregados com sucesso!");
            } catch (Exception e) {
                System.err.println("Erro ao carregar dados do db.json: " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            System.out.println("Banco de dados H2 já contém dados. Pulando carregamento do db.json.");
        }
    }
}