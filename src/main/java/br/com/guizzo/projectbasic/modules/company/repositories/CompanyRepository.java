package br.com.guizzo.projectbasic.modules.company.repositories;

import br.com.guizzo.projectbasic.modules.company.domain.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {
    Company findFirstByIdAndDeletedAtIsNull(Long id);

    Company findFirstByNameOrEmailAndDeletedAtIsNull(String name, String email);

    Boolean existsByOrganizationIdAndDeletedAtIsNull(Long organizationId);
}