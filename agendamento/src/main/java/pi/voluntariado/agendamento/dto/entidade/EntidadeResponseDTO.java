package pi.voluntariado.agendamento.dto.entidade;

import pi.voluntariado.agendamento.model.Entidade;
import pi.voluntariado.agendamento.enums.DiaDaSemana; // Importar o enum
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
public class EntidadeResponseDTO {
    private Long id;
    private String nome;
    private String endereco;
    private String responsavel;
    private String telefone;
    private List<DiaDaSemana> diasVisita;
    private LocalTime horarioInicioVisita; // <<< NOVO CAMPO
    private LocalTime horarioFimVisita;   // <<< NOVO CAMPO
    // private String horarioVisita; // <<< REMOVA ESTE CAMPO

    public EntidadeResponseDTO(Entidade entidade) {
        this.id = entidade.getId();
        this.nome = entidade.getNome();
        this.endereco = entidade.getEndereco();
        this.responsavel = entidade.getResponsavel();
        this.telefone = entidade.getTelefone();
        this.diasVisita = entidade.getDiasVisita();
        this.horarioInicioVisita = entidade.getHorarioInicioVisita(); // Mapeia o novo campo
        this.horarioFimVisita = entidade.getHorarioFimVisita();     // Mapeia o novo campo
        // this.horarioVisita = entidade.getHorarioVisita(); // <<< REMOVA ESTA LINHA
    }
}
