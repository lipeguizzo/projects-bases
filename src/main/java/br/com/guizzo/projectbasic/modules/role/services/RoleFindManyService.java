package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.role.domain.dto.RoleFindManyDTO;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.role.domain.enums.RoleReferences;
import br.com.guizzo.projectbasic.modules.role.helpers.RoleReferencePermissionHelper;
import br.com.guizzo.projectbasic.modules.role.repositories.RoleRepository;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.shared.domain.dto.PaginationResponseDTO;
import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;
import br.com.guizzo.projectbasic.shared.types.PaginationSort;
import br.com.guizzo.projectbasic.shared.utils.PaginationMetadataUtil;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleFindManyService {
    @Autowired
    private RoleRepository roleRepository;

    public PaginationResponseDTO<Role> execute(RoleFindManyDTO dto, User userRequest){
        Page<Role> roles = this.findRoles(dto, userRequest);

        return new PaginationResponseDTO<>(
                roles.getContent(),
                PaginationMetadataUtil.generatePaginationMeta(
                        "/roles",
                        roles.getSize(),
                        dto.getPage(),
                        dto.getPageSize(),
                        dto
                )
        );
    }

    private Page<Role> findRoles(RoleFindManyDTO dto, User userRequest){
        Integer skip = (dto.getPage() - 1) * dto.getPageSize();
        Integer take = dto.getPageSize();
        Sort.Order order = this.formatOrderByColumn(dto);

        Pageable pageable = PageRequest.of(skip, take, Sort.by(order));

        return roleRepository.findAll(
                this.generateDynamicWhere(dto, userRequest), pageable);
    }

    private Specification<Role> generateDynamicWhere(RoleFindManyDTO dto, User userRequest){
        try{
            Specification<Role> spec = Specification.where((root, query, criteriaBuilder) -> {
                Predicate firstCondition = criteriaBuilder.equal(root.get("isDefault"), false);

                if (userRequest.getOrganization() != null && userRequest.getOrganization().getId() != null) {
                    Join<Role, Organization> organizationJoin = root.join("organization", JoinType.INNER);
                    firstCondition = criteriaBuilder.and(firstCondition,
                            criteriaBuilder.equal(organizationJoin.get("id"), userRequest.getOrganization().getId()));
                }

                if (userRequest.getCompany() != null && userRequest.getCompany().getId() != null) {
                    Join<Role, Company> companyJoin = root.join("company", JoinType.INNER);
                    firstCondition = criteriaBuilder.and(firstCondition,
                            criteriaBuilder.equal(companyJoin.get("id"), userRequest.getCompany().getId()));
                }

                Predicate secondCondition = criteriaBuilder.equal(root.get("isDefault"), true);

                return criteriaBuilder.or(firstCondition, secondCondition);
            }
            );

            List<RoleReferences> rolePermissions = RoleReferencePermissionHelper.execute(userRequest);

            if (!rolePermissions.isEmpty()) {
                spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.or(
                        root.get("reference").in(rolePermissions)
                ));
            }

            if (dto.getSearch() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + dto.getSearch() + "%")
                ));
            }

            if (dto.getName() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get("name"), "%" + dto.getName() + "%"));
            }

            if (dto.getIsDefault() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("isDefault"), dto.getIsDefault()));
            }

            if (dto.getReference() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("reference"), dto.getReference()));
            }

            if (dto.getStatus() != null && !dto.getStatus().isEmpty()) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        root.get("status").in(dto.getStatus()));
            }

            if (dto.getIncludeDeleted() != null) {
                if(dto.getIncludeDeleted()) {
                    spec = spec.and((root, query, criteriaBuilder) ->
                            criteriaBuilder.or(
                                    criteriaBuilder.isNull(root.get("deletedAt")),
                                    criteriaBuilder.isNotNull(root.get("deletedAt"))
                            )
                    );
                }else{
                    spec = spec.and((root, query, criteriaBuilder) ->
                            criteriaBuilder.isNull(root.get("deletedAt"))
                    );
                }
            }

            return spec;

        }catch (Exception e){
            throw new BadRequestException(e.getMessage());
        }

    }

    private Sort.Order formatOrderByColumn(RoleFindManyDTO params){
        Sort.Direction direction = PaginationSort.getDirection(params.getOrdering());
        if(params.getOrderBy().isEmpty()) return new Sort.Order(direction, "id");

        return new Sort.Order(direction, params.getOrderBy());
    }
}
