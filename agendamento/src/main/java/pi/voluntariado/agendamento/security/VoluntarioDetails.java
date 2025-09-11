package pi.voluntariado.agendamento.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pi.voluntariado.agendamento.model.Voluntario;

import java.util.Collection;
import java.util.List;

public class VoluntarioDetails implements UserDetails {

    private final Voluntario voluntario;

    public VoluntarioDetails(Voluntario voluntario) {
        this.voluntario = voluntario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Converte a role do seu enum para o formato do Spring Security (ROLE_ADMIN, ROLE_USER)
        return List.of(new SimpleGrantedAuthority("ROLE_" + voluntario.getRole().name()));
    }

    @Override
    public String getPassword() {
        return voluntario.getSenha();
    }

    @Override
    public String getUsername() {
        return voluntario.getLogin(); // Usa o campo 'login' como username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Implemente sua lógica de expiração de conta aqui
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implemente sua lógica de bloqueio de conta aqui
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implemente sua lógica de expiração de credenciais aqui
    }

    @Override
    public boolean isEnabled() {
        return true; // Implemente sua lógica de habilitação/desabilitação de conta aqui
    }
    public Voluntario getVoluntario() {
        return voluntario;
    }
}
