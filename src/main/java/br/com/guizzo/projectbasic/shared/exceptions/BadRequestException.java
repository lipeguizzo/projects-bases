package br.com.guizzo.projectbasic.shared.exceptions;

public class BadRequestException extends RuntimeException {
    private Integer status;
    private String name;

    public BadRequestException(String message) {
        super(message);
        this.status = 400;
        this.name = "Bad Request";
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
        status = 400;
        name = "Bad Request";
    }
}
