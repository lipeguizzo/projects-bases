package br.com.guizzo.projectbasic.modules.role.repositories;


import br.com.guizzo.projectbasic.modules.role.domain.entities.Ability;
import br.com.guizzo.projectbasic.modules.role.domain.enums.AbilityCodes;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbilityRepository extends CrudRepository<Ability, Long> {
    Ability findFirstByIdAndDeletedAtIsNull(Long id);

    List<Ability> findByCode(AbilityCodes code);

}
