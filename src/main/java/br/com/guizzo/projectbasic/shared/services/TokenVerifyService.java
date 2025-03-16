package br.com.guizzo.projectbasic.shared.services;

import br.com.guizzo.projectbasic.shared.exceptions.UnauthorizedException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenVerifyService {

    @Value("${JWT_ISSUER}")
    private String issuer;

    @Value("${JWT_SECRET}")
    private String secret;

    public String execute(String token) throws JWTVerificationException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secret);
            return JWT.require(algorithm)
                    .withIssuer(this.issuer)
                    .build()
                    .verify(token)
                    .getSubject();

            } catch (JWTVerificationException e) {
                throw new UnauthorizedException(e.getMessage());
        }

    }

    public String execute(String token, String secret) throws JWTVerificationException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer(this.issuer)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            throw new UnauthorizedException(e.getMessage());
        }

    }
}
