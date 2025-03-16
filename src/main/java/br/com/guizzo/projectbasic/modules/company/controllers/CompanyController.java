package br.com.guizzo.projectbasic.modules.company.controllers;

import br.com.guizzo.projectbasic.modules.company.domain.dto.CompanyCreateDTO;
import br.com.guizzo.projectbasic.modules.company.domain.dto.CompanyFindManyDTO;
import br.com.guizzo.projectbasic.modules.company.domain.dto.CompanyUpdateDTO;
import br.com.guizzo.projectbasic.modules.company.domain.dto.CompanyUpdateStatusDTO;
import br.com.guizzo.projectbasic.modules.company.services.*;
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
@RequestMapping("/companies")
@Tag(name = "Companies")
public class CompanyController {

    @Autowired
    private CompanyFindManyService companyFindManyService;

    @Autowired
    private CompanyFindOneService companyFindOneService;

    @Autowired
    private CompanyCreateService companyCreateService;

    @Autowired
    private CompanyUpdateService companyUpdateService;

    @Autowired
    private CompanyUpdateStatusService companyUpdateStatusService;

    @Autowired
    private CompanyUpdateAvatarService companyUpdateAvatarService;

    @Autowired
    private CompanyDeleteAvatarService companyDeleteAvatarService;

    @Autowired
    private CompanyDeleteService companyDeleteService;

    @GetMapping()
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.READ)
    public ResponseEntity<?> findAll(@ModelAttribute CompanyFindManyDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.companyFindManyService.execute(dto, userRequest)
        );
    }

    @GetMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.READ)
    public ResponseEntity<?> findOne(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.companyFindOneService.execute(id, userRequest)
        );
    }

    @PostMapping()
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.CREATE)
    public ResponseEntity<?> create(@Valid @RequestBody CompanyCreateDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.companyCreateService.execute(dto, userRequest)
        );
    }

    @PutMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.UPDATE)
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody CompanyUpdateDTO dto, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.companyUpdateService.execute(id, dto, userRequest)
        );
    }

    @PatchMapping("/{id}/status")
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.UPDATE)
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id, @Valid @RequestBody CompanyUpdateStatusDTO dto, @UserRequest User userRequest
    ) {
        return ResponseEntity.ok(
                this.companyUpdateStatusService.execute(id, dto, userRequest)
        );
    }

    @PostMapping("/{id}/avatar")
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.UPDATE)
    public ResponseEntity<?> updateAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.companyUpdateAvatarService.execute(id, file, userRequest)
        );
    }

    @DeleteMapping("/{id}/avatar")
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.DELETE)
    public ResponseEntity<?> deleteAvatar(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.companyDeleteAvatarService.execute(id, userRequest)
        );
    }

    @DeleteMapping("/{id}")
    @RequireAbilities(code = AbilityCodes.COMPANIES, action = AbilityActions.DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id, @UserRequest User userRequest) {
        return ResponseEntity.ok(
                this.companyDeleteService.execute(id, userRequest)
        );
    }

}