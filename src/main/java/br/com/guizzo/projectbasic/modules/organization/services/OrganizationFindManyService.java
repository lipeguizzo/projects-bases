package br.com.guizzo.projectbasic.modules.organization.services;

import br.com.guizzo.projectbasic.modules.address.domain.entities.Address;
import br.com.guizzo.projectbasic.modules.organization.domain.dto.OrganizationFindManyDTO;
import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import br.com.guizzo.projectbasic.modules.organization.repositories.OrganizationRepository;
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

@Service
public class OrganizationFindManyService {
    @Autowired
    private OrganizationRepository organizationRepository;

    public PaginationResponseDTO<Organization> execute(OrganizationFindManyDTO dto, User userRequest){
        Page<Organization> organizations = this.findOrganizations(dto, userRequest);


        return new PaginationResponseDTO<>(
                organizations.getContent(),
                PaginationMetadataUtil.generatePaginationMeta(
                        "/organizations",
                        organizations.getSize(),
                        dto.getPage(),
                        dto.getPageSize(),
                        dto
                )
        );
    }

    private Page<Organization> findOrganizations(OrganizationFindManyDTO dto, User userRequest){
        Integer skip = (dto.getPage() - 1) * dto.getPageSize();
        Integer take = dto.getPageSize();
        Sort.Order order = this.formatOrderByColumn(dto);

        Pageable pageable = PageRequest.of(skip, take, Sort.by(order));

        return organizationRepository.findAll(
                this.generateDynamicWhere(dto, userRequest), pageable);
    }

    private Specification<Organization> generateDynamicWhere(OrganizationFindManyDTO dto, User userRequest){
        try{
            Specification<Organization> spec = Specification.where(
                    (root, query, criteriaBuilder) -> {
                        Predicate condition = criteriaBuilder.conjunction();

                        if (userRequest.getOrganization() != null) {
                            condition = criteriaBuilder.and(condition,
                                    criteriaBuilder.equal(root.get("id"), userRequest.getOrganization().getId()));
                        }

                        return condition;
                }
            );

            if (dto.getSearch() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + dto.getSearch() + "%"),
                        criteriaBuilder.like(root.get("tradeName"), "%" + dto.getSearch() + "%"),
                        criteriaBuilder.like(root.get("email"), "%" + dto.getSearch() + "%")
                ));
            }

            if (dto.getName() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get("name"), "%" + dto.getName() + "%"));
            }

            if (dto.getTradeName() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get("tradeName"), "%" + dto.getTradeName() + "%"));
            }

            if (dto.getEmail() != null) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.like(root.get("email"), "%" + dto.getEmail() + "%"));
            }

            if (dto.getStatus() != null && !dto.getStatus().isEmpty()) {
                spec = spec.and((root, query, criteriaBuilder) ->
                        root.get("status").in(dto.getStatus()));
            }

            if (dto.getState() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<Organization, Address> addressJoin = root.join("address", JoinType.INNER);
                    return criteriaBuilder.like(addressJoin.get("state"), "%" + dto.getState() + "%");
                });
            }

            if (dto.getCity() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<Organization, Address> addressJoin = root.join("address", JoinType.INNER);
                    return criteriaBuilder.like(addressJoin.get("city"), "%" + dto.getCity() + "%");
                });
            }

            if (dto.getStreet() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<Organization, Address> addressJoin = root.join("address", JoinType.INNER);
                    return criteriaBuilder.like(addressJoin.get("street"), "%" + dto.getStreet() + "%");
                });
            }

            if (dto.getNeighborhood() != null) {
                spec = spec.and((root, query, criteriaBuilder) -> {
                    Join<Organization, Address> addressJoin = root.join("address", JoinType.INNER);
                    return criteriaBuilder.like(addressJoin.get("neighborhood"), "%" + dto.getNeighborhood() + "%");
                });
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

    private Sort.Order formatOrderByColumn(OrganizationFindManyDTO params){
        Sort.Direction direction = PaginationSort.getDirection(params.getOrdering());
        if(params.getOrderBy().isEmpty()) return new Sort.Order(direction, "id");

        return new Sort.Order(direction, params.getOrderBy());
    }
}
