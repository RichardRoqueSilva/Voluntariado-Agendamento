package pi.voluntariado.agendamento.controller;

import pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO;
import pi.voluntariado.agendamento.dto.dashboard.DashboardPizzaDataDTO;
import pi.voluntariado.agendamento.dto.voluntario.VoluntarioRequestDTO;
import pi.voluntariado.agendamento.dto.voluntario.VoluntarioResponseDTO;
import pi.voluntariado.agendamento.service.DashboardService;
import pi.voluntariado.agendamento.service.VoluntarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/voluntarios")
@CrossOrigin(origins = "http://localhost:4200")
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
    @Autowired private DashboardService dashboardService;

    @GetMapping("/taxa-participacao")
    public ResponseEntity<Double> getTaxa(@RequestParam int ano, @RequestParam int mes) {
        return ResponseEntity.ok(dashboardService.calcularTaxaParticipacao(ano, mes));
    }

    @GetMapping("/visitas/quantidades")
    public ResponseEntity<Long> getParticipantes(@RequestParam int ano, @RequestParam int mes) {
        return ResponseEntity.ok(voluntarioService.countParticipantes(ano, mes));
    }

    @GetMapping("/nao-participantes-visitas/quantidades")
    public ResponseEntity<Long> getNaoParticipantes(@RequestParam int ano, @RequestParam int mes) {
        return ResponseEntity.ok(voluntarioService.countNaoParticipantes(ano, mes));
    }

    @GetMapping("/visitas/totais/horas")
    public ResponseEntity<Double> getHoras(@RequestParam int ano, @RequestParam int mes) {
        return ResponseEntity.ok(dashboardService.calcularHorasTotais(ano, mes));
    }

    @GetMapping("/visitas")
    public ResponseEntity<List<DashboardBarDataDTO>> getVisitasPorVoluntario(@RequestParam int ano, @RequestParam int mes) {
        return ResponseEntity.ok(dashboardService.getVisitasPorVoluntario(ano, mes));
    }

    @GetMapping("/visitas/quantidades/totais")
    public ResponseEntity<List<DashboardPizzaDataDTO>> getQtdeVoluntariosTotais(@RequestParam int ano, @RequestParam int mes) {
        // Retorna os dados para o gráfico de pizza (Participaram vs Não Participaram)
        List<DashboardPizzaDataDTO> dados = new ArrayList<>();
        long participantes = voluntarioService.countParticipantes(ano, mes);
        long naoParticipantes = voluntarioService.countNaoParticipantes(ano, mes);

        dados.add(new DashboardPizzaDataDTO("Participantes", (double) participantes));
        dados.add(new DashboardPizzaDataDTO("Não Participantes", (double) naoParticipantes));

        return ResponseEntity.ok(dados);
    }
}
