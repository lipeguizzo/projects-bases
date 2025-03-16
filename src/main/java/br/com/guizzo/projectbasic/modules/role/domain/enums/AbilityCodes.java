package br.com.guizzo.projectbasic.modules.role.domain.enums;

public enum AbilityCodes {
    ADMIN("ADMIN"),
    ORGANIZATIONS("ORGANIZATIONS"),
    COMPANIES("COMPANIES"),
    USERS("USERS"),
    ROLES("ROLES");

    private final String abilityCode;

    AbilityCodes(String abilityCode) {
        this.abilityCode = abilityCode;
    }

    @Override
    public String toString() {
        return this.abilityCode;
    }
}
