package br.com.guizzo.projectbasic.shared.exceptions;

public class ConflictException extends RuntimeException {
    private Integer status;
    private String name;

    public ConflictException(String message) {
        super(message);
        this.status = 409;
        this.name = "Conflict";
    }

    public ConflictException(String message, Throwable cause) {
        super(message, cause);
        this.status = 409;
        this.name = "Conflict";
    }
}
