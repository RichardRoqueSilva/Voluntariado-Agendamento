package pi.voluntariado.agendamento.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pi.voluntariado.agendamento.dto.auth.AuthResponseDTO;
import pi.voluntariado.agendamento.dto.auth.UserAuthDTO;
import pi.voluntariado.agendamento.model.Voluntario;
import pi.voluntariado.agendamento.security.VoluntarioDetails;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid UserAuthDTO data) {
        // Cria um token de autenticação com as credenciais fornecidas
        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(data.getLogin(), data.getSenha());

        // Tenta autenticar o usuário
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);

        // Se a autenticação foi bem-sucedida, obtenha os detalhes do usuário
        UserDetails userDetails = (UserDetails) auth.getPrincipal();

        // Recuperar o Voluntario real (se VoluntarioDetails armazena ele) ou a role
        // No nosso caso, VoluntarioDetails armazena a entidade Voluntario
        Voluntario voluntario = ((VoluntarioDetails) userDetails).getVoluntario(); // Obtenha o voluntário da implementação UserDetails

        return ResponseEntity.ok(new AuthResponseDTO("Autenticação bem-sucedida!", voluntario.getLogin(), voluntario.getRole()));
    }
}
