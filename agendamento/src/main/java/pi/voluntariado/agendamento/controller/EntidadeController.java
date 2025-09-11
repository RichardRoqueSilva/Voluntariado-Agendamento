package pi.voluntariado.agendamento.controller;

import pi.voluntariado.agendamento.dto.entidade.EntidadeRequestDTO;
import pi.voluntariado.agendamento.dto.entidade.EntidadeResponseDTO;
import pi.voluntariado.agendamento.service.EntidadeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entidades")
public class EntidadeController {

    @Autowired
    private EntidadeService entidadeService;

    @GetMapping
    public ResponseEntity<List<EntidadeResponseDTO>> getAllEntidades() {
        return ResponseEntity.ok(entidadeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntidadeResponseDTO> getEntidadeById(@PathVariable Long id) {
        return ResponseEntity.ok(entidadeService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EntidadeResponseDTO> createEntidade(@Valid @RequestBody EntidadeRequestDTO entidadeDTO) {
        EntidadeResponseDTO createdEntidade = entidadeService.create(entidadeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEntidade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntidadeResponseDTO> updateEntidade(@PathVariable Long id, @Valid @RequestBody EntidadeRequestDTO entidadeDTO) {
        EntidadeResponseDTO updatedEntidade = entidadeService.update(id, entidadeDTO);
        return ResponseEntity.ok(updatedEntidade);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntidade(@PathVariable Long id) {
        entidadeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
