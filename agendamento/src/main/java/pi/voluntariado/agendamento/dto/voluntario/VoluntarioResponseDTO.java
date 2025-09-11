package pi.voluntariado.agendamento.dto.voluntario;

import pi.voluntariado.agendamento.enums.UserRole;
import pi.voluntariado.agendamento.model.Voluntario;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VoluntarioResponseDTO {
    private Long id;
    private String nome;
    private String celular;
    private String observacao;
    private String login;
    private String email; // <<< NOVO CAMPO
    private UserRole role; // <<< NOVO CAMPO
    // NÃO INCLUA A SENHA EM RESPONSE DTO POR SEGURANÇA!

    public VoluntarioResponseDTO(Voluntario voluntario) {
        this.id = voluntario.getId();
        this.nome = voluntario.getNome();
        this.celular = voluntario.getCelular();
        this.observacao = voluntario.getObservacao();
        this.login = voluntario.getLogin();
        this.email = voluntario.getEmail(); // Mapear o novo campo
        this.role = voluntario.getRole();   // Mapear o novo campo
    }
}