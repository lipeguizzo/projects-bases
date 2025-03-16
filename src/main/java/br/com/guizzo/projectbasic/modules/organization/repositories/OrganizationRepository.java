package br.com.guizzo.projectbasic.modules.organization.repositories;

import br.com.guizzo.projectbasic.modules.organization.domain.entities.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long>, JpaSpecificationExecutor<Organization> {
    Organization findFirstByIdAndDeletedAtIsNull(Long id);

    Organization findFirstByNameOrEmailAndDeletedAtIsNull(String name, String email);
        
}