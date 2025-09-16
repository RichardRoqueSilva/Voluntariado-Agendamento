package pi.voluntariado.agendamento.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.time.DayOfWeek; // <<< Importe esta classe

public enum DiaDaSemana {
    SEGUNDA("Segunda-feira"),
    TERCA("Terça-feira"),
    QUARTA("Quarta-feira"),
    QUINTA("Quinta-feira"),
    SEXTA("Sexta-feira"),
    SABADO("Sábado"),
    DOMINGO("Domingo");

    private String descricao;

    DiaDaSemana(String descricao) {
        this.descricao = descricao;
    }

    @JsonValue
    public String getDescricao() {
        return descricao;
    }

    @JsonCreator
    public static DiaDaSemana fromDescricao(String text) {
        for (DiaDaSemana dia : DiaDaSemana.values()) {
            if (dia.descricao.equalsIgnoreCase(text)) {
                return dia;
            }
        }
        throw new IllegalArgumentException("Dia da semana inválido: " + text);
    }


    public static DiaDaSemana fromDayOfWeek(DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> SEGUNDA;
            case TUESDAY -> TERCA;
            case WEDNESDAY -> QUARTA;
            case THURSDAY -> QUINTA;
            case FRIDAY -> SEXTA;
            case SATURDAY -> SABADO;
            case SUNDAY -> DOMINGO;
            default -> throw new IllegalArgumentException("Dia da semana do Java inválido: " + dayOfWeek);
        };
    }

}