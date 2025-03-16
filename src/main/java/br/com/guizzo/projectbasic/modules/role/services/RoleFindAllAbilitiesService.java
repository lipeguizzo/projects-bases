package br.com.guizzo.projectbasic.modules.role.services;

import br.com.guizzo.projectbasic.modules.role.domain.entities.Ability;
import br.com.guizzo.projectbasic.modules.role.repositories.AbilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleFindAllAbilitiesService {


    @Autowired
    private AbilityRepository abilityRepository;

    public List<Ability> execute(){

        List<Ability> abilities = new ArrayList<>();

        abilityRepository.findAll().forEach(abilities::add);
        
        return abilities;
    }

}
