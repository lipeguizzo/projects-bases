package br.com.guizzo.projectbasic.modules.user.services;

import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.role.domain.entities.Role;
import br.com.guizzo.projectbasic.modules.user.domain.dto.UserFindManyDTO;
import br.com.guizzo.projectbasic.modules.user.domain.entities.User;
import br.com.guizzo.projectbasic.modules.user.repositories.UserRepository;
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

@Service
public class UserFindManyService {
    @Autowired
    private UserRepository userRepository;

    public PaginationResponseDTO<User> execute(UserFindManyDTO dto, User userRequest){
        Page<User> users = this.findUsers(dto, userRequest);

        return new PaginationResponseDTO<>(
                users.getContent(),
                PaginationMetadataUtil.generatePaginationMeta(
                        "/users",
                        users.getSize(),
                        dto.getPage(),
                        dto.getPageSize(),
                        dto
                )
        );
    }

    private Page<User> findUsers(UserFindManyDTO dto, User userRequest){
        Integer skip = (dto.getPage() - 1) * dto.getPageSize();
        Integer take = dto.getPageSize();
        Sort.Order order = this.formatOrderByColumn(dto);

        Pageable pageable = PageRequest.of(skip, take, Sort.by(order));

        return userRepository.findAll(
                this.generateDynamicWhere(dto, userRequest), pageable);
    }

    private Specification<User> generateDynamicWhere(UserFindManyDTO dto, User userRequest){
        try{
            Specification<User> spec = Specification.where(
                    (root, query, criteriaBuilder) -> {
                        Predicate condition = criteriaBuilder.conjunction();

                        if (userRequest.getOrganization() != null && userRequest.getOrganization().getId() != null) {
                            Join<User, Organization> organizationJoin = root.join("organization", JoinType.INNER);
                            condition = criteriaBuilder.and(condition,
                                    criteriaBuilder.equal(organizationJoin.get("id"), userRequest.getOrganization().getId()));
                        }

                        if (userRequest.getCompany() != null && userRequest.getCompany().getId() != null) {
                            Join<User, Company> companyJoin = root.join("company", JoinType.INNER);
                            condition = criteriaBuilder.and(condition,
                                    criteriaBuilder.equal(companyJoin.get("id"), userRequest.getCompany().getId()));
                        }

                        return condition;
                }
            );

            if (dto.getSearch() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + dto.getSearch() + "%"),
                        criteriaBuilder.like(root.get("email"), "%" + dto.getSearch() + "%")
                ));
            }

            if (dto.getName() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get("name"), "%" + dto.getName() + "%"));
            }

            if (dto.getEmail() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get("email"), "%" + dto.getEmail() + "%"));
            }

            if (dto.getGender() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("gender"), dto.getGender()));
            }

            if (dto.getRoleId() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<User, Role> roleJoin = root.join("role", JoinType.INNER);
                    return criteriaBuilder.equal(roleJoin.get("id"), dto.getRoleId());
                });
            }

            if (dto.getRoleReference() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<User, Role> roleJoin = root.join("role", JoinType.INNER);
                    return criteriaBuilder.equal(roleJoin.get("reference"), dto.getRoleReference());
                });
            }

            if (dto.getOrganizationId() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<User, Organization> organizationJoin = root.join("organization", JoinType.INNER);
                    return criteriaBuilder.equal(organizationJoin.get("id"), dto.getOrganizationId());
                });
            }

            if (dto.getCompanyId() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<User, Company> companyJoin = root.join("company", JoinType.INNER);
                    return criteriaBuilder.equal(companyJoin.get("id"), dto.getCompanyId());
                });
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

    private Sort.Order formatOrderByColumn(UserFindManyDTO params){
        Sort.Direction direction = PaginationSort.getDirection(params.getOrdering());
        if(params.getOrderBy().isEmpty()) return new Sort.Order(direction, "id");

        return new Sort.Order(direction, params.getOrderBy());
    }
}
