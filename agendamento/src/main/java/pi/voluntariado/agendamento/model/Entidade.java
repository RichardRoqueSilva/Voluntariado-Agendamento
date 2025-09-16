package pi.voluntariado.agendamento.model;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import pi.voluntariado.agendamento.enums.DiaDaSemana;

import java.time.LocalTime;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // <--- MANTENHA ASSIM
    private Long id;
    private String nome;
    private String endereco;
    private String responsavel;
    private String telefone;

    @ElementCollection
    @CollectionTable(name = "entidade_dias_visita", joinColumns = @JoinColumn(name = "entidade_id"))
    @Column(name = "dia_visita")
    @Enumerated(EnumType.STRING)
    private List<DiaDaSemana> diasVisita;

    private LocalTime horarioInicioVisita;
    private LocalTime horarioFimVisita;
}

