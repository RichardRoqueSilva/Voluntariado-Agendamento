package pi.voluntariado.agendamento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.voluntariado.agendamento.dto.dashboard.DashboardBarDataDTO;
import pi.voluntariado.agendamento.service.DashboardService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/dias")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardCronologicoController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/semana/visitas")
    public ResponseEntity<List<DashboardBarDataDTO>> getVisitasSemana(@RequestParam int ano, @RequestParam int mes) {
        // Implementar lógica de contagem por dia da semana (Seg, Ter, Qua...)
        return ResponseEntity.ok(dashboardService.getVisitasPorDiaSemana(ano, mes));
    }

    @GetMapping("/visitas/periodo")
    public ResponseEntity<List<DashboardBarDataDTO>> getVisitasPeriodo(@RequestParam int ano, @RequestParam int mes) {
        // Implementar lógica por Manhã, Tarde, Noite
        return ResponseEntity.ok(dashboardService.getVisitasPorPeriodo(ano, mes));
    }

    @GetMapping("/visitas/ultimos/3/meses")
    public ResponseEntity<List<Object>> getVisitasUltimosMeses() {
        // Retornamos uma lista vazia para o gráfico não dar erro de "Forbidden" ou "Null"
        return ResponseEntity.ok(Collections.emptyList());
    }
}
