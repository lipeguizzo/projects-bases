package br.com.guizzo.projectbasic.modules.role.controllers;

import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleCreateDTO;
import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleFindManyDTO;
import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleUpdateDTO;
import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleUpdateStatusDTO;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityActions;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityCodes;
import br.com.guizzo.projectbasic.modules.role.services.*;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.annotations.RequireAbilities;
import br.com.guizzo.projectbasic.shared.annotations.UserRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/roles")
@Tag(name = "Roles")
public class RoleController {

    @Autowired
    private RoleFindManyService roleFindManyService;

    @Autowired
    private RoleFindOneService roleFindOneService;

    @Autowired
    private RoleFindAbilitiesService roleFindAbilitiesService;

    @Autowired
    private RoleFindAllAbilitiesService roleFindAllAbilitiesService;

    @Autowired
    private RoleCreateService roleCreateService;

    @Autowired
    private RoleUpdateService roleUpdateService;

    @Autowired
    private RoleUpdateStatusService roleUpdateStatusService;

    @Autowired
    private RoleDeleteService roleDeleteService;
    
    @GetMapping()
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.READ)
    public ResponseEntity<?> findAll(@ModelAttribute RoleFindManyDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.roleFindManyService.execute(dto, userRequest)
        );
    }

    @GetMapping("/all-abilities")
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.READ)
    public ResponseEntity<?> findAllAbilities() {
        return ResponseEntity.ok(
                this.roleFindAllAbilitiesService.execute()
        );
    }

    @GetMapping("/{id}/abilities")
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.READ)
    public ResponseEntity<?> findAbilities(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.roleFindAbilitiesService.execute(id, userRequest)
        );
    }

    @GetMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.READ)
    public ResponseEntity<?> findOne(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.roleFindOneService.execute(id, userRequest)
        );
    }


    @PostMapping()
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.CREATE)
    public ResponseEntity<?> create(@Valid @RequestBody RoleCreateDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.roleCreateService.execute(dto, userRequest)
        );
    }

    @PutMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.UPDATE)
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody RoleUpdateDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.roleUpdateService.execute(id, dto, userRequest)
        );
    }

    @PatchMapping("/{id}/status")
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.UPDATE)
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id, @Valid @RequestBody RoleUpdateStatusDTO dto, @UserRequest User userRequest
    ) {
        return ResponseEntity.ok(
                this.roleUpdateStatusService.execute(id, dto, userRequest)
        );
    }

    @DeleteMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.ROLES, action = AbilityActions.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.roleDeleteService.execute(id, userRequest)
        );
    }

}