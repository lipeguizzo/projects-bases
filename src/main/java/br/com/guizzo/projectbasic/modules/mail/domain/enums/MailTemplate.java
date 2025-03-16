package br.com.guizzo.projectbasic.modules.mail.domain.enums;

public enum MailTemplate {
    DEFAULT("default"),
    RECOVER_PASSWORD("recover-password"),
    ORGANIZATION_ACTIVATION("organization-activation");

    private final String mailTemplate;

    MailTemplate(String mailTemplate) {
        this.mailTemplate = mailTemplate;
    }

    @Override
    public String toString() {
        return this.mailTemplate;
    }
}
