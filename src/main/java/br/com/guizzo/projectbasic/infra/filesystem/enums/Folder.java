package br.com.guizzo.projectbasic.infra.filesystem.enums;

public enum Folder {
    USERS("users"),
    ORGANIZATIONS("organizations"),
    COMPANIES("companies");

    private final String folder;

    Folder(String folder) {
        this.folder = folder;
    }

    @Override
    public String toString() {
        return this.folder;
    }
}
