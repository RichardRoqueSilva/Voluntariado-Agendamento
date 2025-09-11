package pi.voluntariado.agendamento.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator; // <<< Adicione esta importação
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Voluntario {

    @Id
    // Define a sequência do banco de dados para gerar os IDs
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "voluntario_seq_generator")
    @SequenceGenerator(name = "voluntario_seq_generator", sequenceName = "voluntario_seq", allocationSize = 1)
    private Long id;
    private String nome;
    private String celular;
    private String observacao;
    private String login;
    private String senha;

}