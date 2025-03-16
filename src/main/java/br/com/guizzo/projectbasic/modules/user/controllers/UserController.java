package br.com.guizzo.projectbasic.modules.user.controllers;

import br.com.guizzo.projectbasic.modules.user.domain.dto.*;
import br.com.guizzo.projectbasic.modules.user.services.*;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityActions;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityCodes;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.annotations.RequireAbilities;
import br.com.guizzo.projectbasic.shared.annotations.UserRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/users")
@Tag(name = "Users")
public class UserController {

    @Autowired
    private UserFindManyService userFindManyService;

    @Autowired
    private UserFindOneService userFindOneService;

    @Autowired
    private UserFindSelfService userFindSelfService;

    @Autowired
    private UserCreateService userCreateService;

    @Autowired
    private UserUpdateService userUpdateService;

    @Autowired
    private UserUpdateSelfService userUpdateSelfService;

    @Autowired
    private UserUpdateStatusService userUpdateStatusService;

    @Autowired
    private UserUpdateAvatarService userUpdateAvatarService;

    @Autowired
    private UserDeleteAvatarService userDeleteAvatarService;

    @Autowired
    private UserDeleteService userDeleteService;

    @GetMapping()
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.READ)
    public ResponseEntity<?> findAll(@ModelAttribute UserFindManyDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userFindManyService.execute(dto, userRequest)
        );
    }

    @GetMapping("/self")
    public ResponseEntity<?> findSelf(@UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userFindSelfService.execute(userRequest)
        );
    }

    @GetMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.READ)
    public ResponseEntity<?> findOne(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userFindOneService.execute(id, userRequest)
        );
    }

    @PostMapping()
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.CREATE)
    public ResponseEntity<?> create(@Valid @RequestBody UserCreateDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userCreateService.execute(dto, userRequest)
        );
    }

    @PutMapping("/self")
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.UPDATE)
    public ResponseEntity<?> updateSelf(@Valid @RequestBody UserUpdateSelfDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userUpdateSelfService.execute(dto, userRequest)
        );
    }

    @PutMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.UPDATE)
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userUpdateService.execute(id, dto, userRequest)
        );
    }

    @PatchMapping("/{id}/status")
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.UPDATE)
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id, @Valid @RequestBody UserUpdateStatusDTO dto, @UserRequest User userRequest
    ) {
        return ResponseEntity.ok(
                this.userUpdateStatusService.execute(id, dto, userRequest)
        );
    }

    @PostMapping("/{id}/avatar")
    public ResponseEntity<?> updateAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userUpdateAvatarService.execute(id, file, userRequest)
        );
    }

    @DeleteMapping("/{id}/avatar")
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.DELETE)
    public ResponseEntity<?> deleteAvatar(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userDeleteAvatarService.execute(id, userRequest)
        );
    }

    @DeleteMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.USERS, action = AbilityActions.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.userDeleteService.execute(id, userRequest)
        );
    }

}