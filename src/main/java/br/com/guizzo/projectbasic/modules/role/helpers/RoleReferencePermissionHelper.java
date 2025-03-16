package br.com.guizzo.projectbasic.modules.role.helpers;

import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class RoleReferencePermissionHelper {
    private static RoleRepository roleRepository;

    @Autowired
    public RoleReferencePermissionHelper(
            RoleRepository roleRepository
    ) {
        RoleReferencePermissionHelper.roleRepository = roleRepository;
    }

    public static List<RoleReferences> execute(User userRequest){

        if (userRequest == null) throw new NotFoundException("Usuário não encontrado!");

        List<RoleReferences> referencePermissions = new ArrayList<>();

        boolean isAdmin = userRequest.getRole().getReference() == RoleReferences.ADMIN;
        boolean isAdminOrganization = userRequest.getRole().getReference() == RoleReferences.ADMIN_ORGANIZATION;
        boolean isAdminCompany = userRequest.getRole().getReference() == RoleReferences.ADMIN_COMPANY;
        boolean isClient = userRequest.getRole().getReference() == RoleReferences.CLIENT;

        if(isAdmin) referencePermissions.add(RoleReferences.ADMIN);
        if(isAdmin || isAdminOrganization) referencePermissions.add(RoleReferences.ADMIN_ORGANIZATION);
        if(isAdmin || isAdminOrganization || isAdminCompany) referencePermissions.add(RoleReferences.ADMIN_COMPANY);
        if(isAdmin || isAdminOrganization || isAdminCompany || isClient) referencePermissions.add(RoleReferences.CLIENT);

        return referencePermissions;

    }
}
