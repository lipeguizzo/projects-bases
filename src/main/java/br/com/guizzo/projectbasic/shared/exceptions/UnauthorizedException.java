package br.com.guizzo.projectbasic.shared.exceptions;

public class UnauthorizedException extends RuntimeException {
    private Integer status;
    private String name;

    public UnauthorizedException(String message) {
        super(message);
        this.status = 401;
        this.name = "Unauthorized";
    }

    public UnauthorizedException(String message, Throwable cause) {
        super(message, cause);
        this.status = 401;
        this.name = "Unauthorized";
    }
}
