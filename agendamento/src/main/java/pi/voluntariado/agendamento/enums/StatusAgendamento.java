// StatusAgendamento.java
package pi.voluntariado.agendamento.enums;

public enum StatusAgendamento {
    CONFIRMADO("Confirmado"),
    AGUARDANDO_CONFIRMACAO("Aguardando Confirmação");

    private final String descricao;

    StatusAgendamento(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}