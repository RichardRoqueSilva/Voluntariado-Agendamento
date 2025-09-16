package pi.voluntariado.agendamento.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pi.voluntariado.agendamento.enums.UserRole;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Voluntario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // <--- MANTENHA ASSIM
    private Long id;
    private String nome;
    private String celular;
    private String observacao;
    private String login;
    private String senha;
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role;
}