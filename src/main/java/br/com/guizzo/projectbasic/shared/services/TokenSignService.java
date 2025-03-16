package br.com.guizzo.projectbasic.shared.services;

import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.domain.enums.PeriodExpiration;
import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.*;

@Service
public class TokenSignService {

    @Value("${JWT_ISSUER}")
    private String issuer;

    @Value("${JWT_SECRET}")
    private String secret;

    private String offset = "-03:00";

    public String execute(User user){
        try {

            Algorithm algorithm = Algorithm.HMAC256(this.secret);
            return JWT.create()
                    .withIssuer(this.issuer)
                    .withSubject(user.getEmail())
                    .withExpiresAt(this.getExpirationDate(10, PeriodExpiration.MINUTE))
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    public String execute(User user, Integer time, PeriodExpiration period, String secret){
        try {

            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer(this.issuer)
                    .withSubject(user.getEmail())
                    .withExpiresAt(this.getExpirationDate(time,period))
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    private Instant getExpirationDate(Integer time, PeriodExpiration period) {
        ZoneOffset zoneOffset = ZoneOffset.of(this.offset);
        OffsetDateTime now =  OffsetDateTime.now(zoneOffset);

        return switch (period) {
            case MONTH -> now.plusMonths(time).toInstant();
            case DAY -> now.plusDays(time).toInstant();
            case HOUR -> now.plusHours(time).toInstant();
            case MINUTE -> now.plusMinutes(time).toInstant();
            case SECOND -> now.plusSeconds(time).toInstant();
        };

    }
}
