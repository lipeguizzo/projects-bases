package br.com.guizzo.projectbasic.shared.validators;

import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;

public class StatusValidator {

    public static void validate(Status status){
        switch (status){
            case BLOCKED -> throw new UnauthorizedException("Status bloqueado!");
            case WAITING -> throw new UnauthorizedException("Status em espera!");
            case DISABLED -> throw new UnauthorizedException("Status desabilitado!");
        }
    }
}
