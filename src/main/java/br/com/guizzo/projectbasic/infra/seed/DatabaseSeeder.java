package br.com.guizzo.projectbasic.infra.seed;


import br.com.guizzo.projectbasic.infra.seed.dto.RoleDataDTO;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Ability;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbility;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbilityId;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityActions;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityCodes;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.role.repositories.AbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleAbilityRepository;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.domain.enums.UserGender;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
import br.com.guizzo.projectbasic.shared.domain.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Value("${ADMIN_NAME}")
    private String adminName;

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AbilityRepository abilityRepository;

    @Autowired
    private RoleAbilityRepository roleAbilityRepository;

    @Override
    public void run(String... args) throws Exception {

        if ( abilityRepository.count() == 0 ){
            this.createAbilities();
        }

        if ( roleRepository.count() == 0 ){
            this.createRoles();
        }

        if ( roleAbilityRepository.count() == 0 ){
            this.createRoleAbilities();
        }

        if ( userRepository.count() == 0 ){
            this.createUser();
        }


    }

    private void createAbilities() {
        createAbilitiesForCode(AbilityCodes.ADMIN, AbilityActions.values());
        createAbilitiesForCode(AbilityCodes.USERS, AbilityActions.values());
        createAbilitiesForCode(AbilityCodes.ROLES, AbilityActions.values());
        createAbilitiesForCode(AbilityCodes.ORGANIZATIONS, AbilityActions.values());
        createAbilitiesForCode(AbilityCodes.COMPANIES, AbilityActions.values());
    }

    private void createAbilitiesForCode(AbilityCodes code, AbilityActions[] actions) {
        for (AbilityActions action : actions) {
            abilityRepository.save(
                    Ability.builder()
                            .code(code)
                            .action(action)
                            .build()
            );
        }
    }

    private void createRoles() {
        List<RoleDataDTO> roles = Arrays.asList(
                new RoleDataDTO("Admin", RoleReferences.ADMIN),
                new RoleDataDTO("Admin Organização", RoleReferences.ADMIN_ORGANIZATION),
                new RoleDataDTO("Admin Empresa", RoleReferences.ADMIN_COMPANY),
                new RoleDataDTO("Cliente", RoleReferences.CLIENT)
        );

        for (RoleDataDTO roleData : roles) {
            roleRepository.save(
                    Role.builder()
                            .name(roleData.name())
                            .isDefault(true)
                            .reference(roleData.reference())
                            .status(Status.ACTIVE)
                            .build()
            );
        }
    }

    private void createRoleAbilities() {
        Role admin = roleRepository.findFirstByReference(RoleReferences.ADMIN);
        Role adminOrganization = roleRepository.findFirstByReference(RoleReferences.ADMIN_ORGANIZATION);
        Role adminCompany = roleRepository.findFirstByReference(RoleReferences.ADMIN_COMPANY);
        Role client = roleRepository.findFirstByReference(RoleReferences.CLIENT);

        List<Ability> adminAbilities = abilityRepository.findByCode(AbilityCodes.ADMIN);
        List<Ability> adminOrganizationAbilities = abilityRepository.findByCode(AbilityCodes.ORGANIZATIONS);
        List<Ability> adminCompanyAbilities = abilityRepository.findByCode(AbilityCodes.COMPANIES);
        List<Ability> roleAbilities = abilityRepository.findByCode(AbilityCodes.ROLES);
        List<Ability> clientAbilities = abilityRepository.findByCode(AbilityCodes.USERS);

        Map<Role, List<Ability>> roleAbilitiesMap = new HashMap<>();

        // Admin
        roleAbilitiesMap.put(admin, Stream.of(
                        adminAbilities,
                        adminOrganizationAbilities,
                        roleAbilities,
                        adminCompanyAbilities,
                        clientAbilities)
                .flatMap(List::stream)
                .distinct()
                .collect(Collectors.toList())
        );

        // Admin Organization
        roleAbilitiesMap.put(adminOrganization, Stream.of(
                        adminOrganizationAbilities,
                        adminCompanyAbilities,
                        roleAbilities,
                        clientAbilities)
                .flatMap(List::stream)
                .distinct()
                .collect(Collectors.toList())
        );

        // Admin Company
        roleAbilitiesMap.put(adminCompany, Stream.of(
                        adminCompanyAbilities,
                        clientAbilities)
                .flatMap(List::stream)
                .distinct()
                .collect(Collectors.toList())
        );

        // Client
        roleAbilitiesMap.put(client, Stream.of(clientAbilities)
                .flatMap(List::stream)
                .distinct()
                .collect(Collectors.toList())
        );

        for (Map.Entry<Role, List<Ability>> entry : roleAbilitiesMap.entrySet()) {
            Role role = entry.getKey();
            List<Ability> abilities = entry.getValue();
            linkRoleAbilities(role, abilities);
        }
    }


    private void linkRoleAbilities(Role role, List<Ability> abilities) {

        for (Ability ability : abilities) {
            roleAbilityRepository.save(
                    RoleAbility.builder()
                            .id(new RoleAbilityId(role.getId(), ability.getId()))
                            .role(role)
                            .ability(ability)
                            .build()
            );
        }
    }

    private void createUser() {
        Role adminRole = roleRepository.findFirstByReference(RoleReferences.ADMIN);
        userRepository.save(
                User.builder()
                        .name(adminName)
                        .email(adminEmail)
                        .password(new BCryptPasswordEncoder().encode(adminPassword))
                        .gender(UserGender.M)
                        .phone("")
                        .role(adminRole)
                        .status(Status.ACTIVE)
                        .build()
        );
    }

}
