package pi.voluntariado.agendamento.controller;

import pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO;
import pi.voluntariado.agendamento.dto.dashboard.DashboardPizzaDataDTO;
import pi.voluntariado.agendamento.dto.entidade.EntidadeRequestDTO;
import pi.voluntariado.agendamento.dto.entidade.EntidadeResponseDTO;
import pi.voluntariado.agendamento.service.DashboardService;
import pi.voluntariado.agendamento.service.EntidadeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    @Autowired private DashboardService dashboardService;

    @GetMapping("/visitas/quantidades")
    public ResponseEntity<Long> getEntidadesVisitadas(@RequestParam int ano, @RequestParam int mes) {
        return ResponseEntity.ok(entidadeService.countVisitadas(ano, mes));
    }

    @GetMapping("/visitas")
    public ResponseEntity<List<DashboardBarDataDTO>> getVisitasPorEntidade(@RequestParam int ano, @RequestParam int mes) {
        return ResponseEntity.ok(dashboardService.getVisitasPorEntidade(ano, mes));
    }

    @GetMapping("/visitas/quantidades/totais")
    public ResponseEntity<List<DashboardPizzaDataDTO>> getQtdeEntidadesTotais(@RequestParam int ano, @RequestParam int mes) {
        List<DashboardPizzaDataDTO> dados = new ArrayList<>();
        long visitadas = entidadeService.countVisitadas(ano, mes);
        // Aqui você pode colocar a lógica de entidades não visitadas se tiver
        dados.add(new DashboardPizzaDataDTO("Visitadas", (double) visitadas));
        return ResponseEntity.ok(dados);
    }
}
