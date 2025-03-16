package br.com.guizzo.projectbasic.modules.organization.controllers;

import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationCreateDTO;
import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationFindManyDTO;
import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationUpdateDTO;
import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationUpdateStatusDTO;
import br.com.guizzo.projectbasic.modules.organization.services.*;
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
@RequestMapping("/organizations")
@Tag(name = "Organizations")
public class OrganizationController {

    @Autowired
    private OrganizationFindManyService organizationFindManyService;

    @Autowired
    private OrganizationFindOneService organizationFindOneService;

    @Autowired
    private OrganizationCreateService organizationCreateService;

    @Autowired
    private OrganizationUpdateService organizationUpdateService;

    @Autowired
    private OrganizationUpdateStatusService organizationUpdateStatusService;

    @Autowired
    private OrganizationUpdateAvatarService organizationUpdateAvatarService;

    @Autowired
    private OrganizationDeleteAvatarService organizationDeleteAvatarService;

    @Autowired
    private OrganizationDeleteService organizationDeleteService;

    @GetMapping()
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.READ)
    public ResponseEntity<?> findAll(@ModelAttribute OrganizationFindManyDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.organizationFindManyService.execute(dto, userRequest)
        );
    }

    @GetMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.READ)
    public ResponseEntity<?> findOne(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.organizationFindOneService.execute(id, userRequest)
        );
    }

    @PostMapping()
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.CREATE)
    public ResponseEntity<?> create(@Valid @RequestBody OrganizationCreateDTO dto) {
        return ResponseEntity.ok(
                this.organizationCreateService.execute(dto)
        );
    }

    @PutMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.UPDATE)
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody OrganizationUpdateDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.organizationUpdateService.execute(id, dto, userRequest)
        );
    }

    @PatchMapping("/{id}/status")
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.UPDATE)
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id, @Valid @RequestBody OrganizationUpdateStatusDTO dto, @UserRequest User userRequest
    ) {
        return ResponseEntity.ok(
                this.organizationUpdateStatusService.execute(id, dto, userRequest)
        );
    }

    @PostMapping("/{id}/avatar")
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.UPDATE)
    public ResponseEntity<?> updateAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.organizationUpdateAvatarService.execute(id, file, userRequest)
        );
    }

    @DeleteMapping("/{id}/avatar")
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.DELETE)
    public ResponseEntity<?> deleteAvatar(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.organizationDeleteAvatarService.execute(id, userRequest)
        );
    }

    @DeleteMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.ORGANIZATIONS, action = AbilityActions.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.organizationDeleteService.execute(id, userRequest)
        );
    }

}