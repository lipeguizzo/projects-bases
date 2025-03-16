package br.com.guizzo.projectbasic.shared.exceptions;


public class NotFoundException extends RuntimeException {
    private Integer status;
    private String name;

    public NotFoundException(String message) {
        super(message);
        this.status = 404;
        this.name = "Not Found";
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
        this.status = 404;
        this.name = "Not Found";
    }
}
