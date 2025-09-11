package pi.voluntariado.agendamento.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;       // <<< Importação para relacionamento Many-to-One
import jakarta.persistence.ManyToMany;      // <<< Importação para relacionamento Many-to-Many
import jakarta.persistence.JoinColumn;      // <<< Importação para @JoinColumn
import jakarta.persistence.JoinTable;       // <<< Importação para @JoinTable
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private LocalTime horario; // <<< ALTERADO PARA LocalTime

    @ManyToMany
    @JoinTable(
            name = "agendamento_voluntarios",
            joinColumns = @JoinColumn(name = "agendamento_id"),
            inverseJoinColumns = @JoinColumn(name = "voluntario_id")
    )
    private List<Voluntario> listaParticipantes;
}
