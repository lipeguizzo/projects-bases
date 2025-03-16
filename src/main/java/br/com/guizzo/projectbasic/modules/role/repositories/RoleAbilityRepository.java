package br.com.guizzo.projectbasic.modules.role.repositories;

import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbility;
import br.com.guizzo.projectbasic.modules.role.domain.entities.RoleAbilityId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleAbilityRepository extends CrudRepository<RoleAbility, RoleAbilityId> {
    List<RoleAbility> findByRoleId(Long roleId);
}
