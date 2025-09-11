package pi.voluntariado.agendamento.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import pi.voluntariado.agendamento.dto.agendamento.AgendamentoJsonDTO;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DbJsonData {
    private List<Voluntario> voluntarios;
    private List<Entidade> entidades;
    private List<AgendamentoJsonDTO> agendamentos; // <<< Agora usa o DTO para JSON
}
