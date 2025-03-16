package br.com.guizzo.projectbasic.modules.auth.controllers;

import br.com.guizzo.projectbasic.modules.auth.domain.dto.*;
import br.com.guizzo.projectbasic.modules.auth.services.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@Tag(name = "Auth")
public class AuthController {

    @Autowired
    private AuthLoginService authLoginService;

    @Autowired
    private AuthRefreshService authRefreshService;

    @Autowired
    private AuthRegisterService authRegisterService;

    @Autowired
    private AuthRecoverPasswordService authRecoverPasswordService;

    @Autowired
    private AuthResetPasswordService authResetPasswordService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthLoginDTO dto) {
        return ResponseEntity.ok(
                this.authLoginService.execute(dto)
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@Valid @RequestBody AuthRefreshDTO dto) {
        return ResponseEntity.ok(
                this.authRefreshService.execute(dto)
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRegisterDTO dto) {
        return ResponseEntity.ok(
                this.authRegisterService.execute(dto)
        );
    }

    @PostMapping("/recover-password")
    public ResponseEntity<?> recoverPassword(@Valid @RequestBody AuthRecoverPasswordDTO dto) {
        return ResponseEntity.ok(
                this.authRecoverPasswordService.execute(dto)
        );
    }

    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody AuthResetPasswordDTO dto) {
        return ResponseEntity.ok(
                this.authResetPasswordService.execute(dto)
        );
    }

}