package br.com.guizzo.projectbasic.modules.role.domain.enums;

public enum AbilityActions {
    READ("READ"),
    CREATE("CREATE"),
    UPDATE("UPDATE"),
    DELETE("DELETE");

    private final String abilityAction;

    AbilityActions(String abilityAction) {
        this.abilityAction = abilityAction;
    }

    @Override
    public String toString() {
        return this.abilityAction;
    }
}
