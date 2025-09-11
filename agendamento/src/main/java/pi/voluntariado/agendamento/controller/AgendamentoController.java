package pi.voluntariado.agendamento.controller;

import pi.voluntariado.agendamento.dto.agendamento.AgendamentoRequestDTO;
import pi.voluntariado.agendamento.dto.agendamento.AgendamentoResponseDTO;
import pi.voluntariado.agendamento.service.AgendamentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public ResponseEntity<List<AgendamentoResponseDTO>> getAllAgendamentos() {
        return ResponseEntity.ok(agendamentoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> getAgendamentoById(@PathVariable Long id) {
        return ResponseEntity.ok(agendamentoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponseDTO> createAgendamento(@Valid @RequestBody AgendamentoRequestDTO agendamentoDTO) {
        AgendamentoResponseDTO createdAgendamento = agendamentoService.create(agendamentoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAgendamento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> updateAgendamento(@PathVariable Long id, @Valid @RequestBody AgendamentoRequestDTO agendamentoDTO) {
        AgendamentoResponseDTO updatedAgendamento = agendamentoService.update(id, agendamentoDTO);
        return ResponseEntity.ok(updatedAgendamento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgendamento(@PathVariable Long id) {
        agendamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
