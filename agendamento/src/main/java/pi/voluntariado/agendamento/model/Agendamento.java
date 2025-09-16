package pi.voluntariado.agendamento.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.voluntariado.agendamento.enums.StatusAgendamento;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "agendamento_seq_generator")
    @SequenceGenerator(name = "agendamento_seq_generator", sequenceName = "agendamento_seq", allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "entidade_id", nullable = false)
    private Entidade entidade;

    private LocalDate diasVisita;
    private LocalTime horario;

    @ManyToMany
    @JoinTable(
            name = "agendamento_voluntarios",
            joinColumns = @JoinColumn(name = "agendamento_id"),
            inverseJoinColumns = @JoinColumn(name = "voluntario_id")
    )
    private List<Voluntario> listaParticipantes;

    @Enumerated(EnumType.STRING) // Define como o ENUM será persistido no banco de dados
    private StatusAgendamento status; // Novo campo para o status do agendamento
}
