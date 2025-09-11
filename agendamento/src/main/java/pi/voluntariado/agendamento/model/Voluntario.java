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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "voluntario_seq_generator")
    @SequenceGenerator(name = "voluntario_seq_generator", sequenceName = "voluntario_seq", allocationSize = 1)
    private Long id;
    private String nome;
    private String celular;
    private String observacao;
    private String login; // Será o username
    private String senha;
    private String email; // <<< NOVO CAMPO

    @Enumerated(EnumType.STRING) // Armazena o nome do enum (ADMIN, USER) como String no BD
    private UserRole role; // <<< NOVO CAMPO
}