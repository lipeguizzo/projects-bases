import { prisma } from '../../../infra/database/prisma.service';
import { AbilityEntity } from './../domain/entities/ability.entity';

class RoleFindAllAbilitiesService {
  async execute(): Promise<AbilityEntity[]> {
    const findAbilities = await prisma.ability.findMany();

    return findAbilities.map((ability) => new AbilityEntity(ability));
  }
}

export const roleFindAllAbilitiesService = new RoleFindAllAbilitiesService();
