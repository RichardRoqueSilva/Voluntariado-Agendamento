package pi.voluntariado.agendamento.controller;

import pi.voluntariado.agendamento.dto.voluntario.VoluntarioRequestDTO;
import pi.voluntariado.agendamento.dto.voluntario.VoluntarioResponseDTO;
import pi.voluntariado.agendamento.service.VoluntarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voluntarios")
public class VoluntarioController {

    @Autowired
    private VoluntarioService voluntarioService;

    @GetMapping
    public ResponseEntity<List<VoluntarioResponseDTO>> getAllVoluntarios() {
        return ResponseEntity.ok(voluntarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VoluntarioResponseDTO> getVoluntarioById(@PathVariable Long id) {
        return ResponseEntity.ok(voluntarioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<VoluntarioResponseDTO> createVoluntario(@Valid @RequestBody VoluntarioRequestDTO voluntarioDTO) {
        VoluntarioResponseDTO createdVoluntario = voluntarioService.create(voluntarioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVoluntario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VoluntarioResponseDTO> updateVoluntario(@PathVariable Long id, @Valid @RequestBody VoluntarioRequestDTO voluntarioDTO) {
        VoluntarioResponseDTO updatedVoluntario = voluntarioService.update(id, voluntarioDTO);
        return ResponseEntity.ok(updatedVoluntario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoluntario(@PathVariable Long id) {
        voluntarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
