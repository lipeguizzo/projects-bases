import { ConflictException } from '@nestjs/common';
import { RoleEntity } from '../domain/entities/role.entity';

export async function roleDefaultValidator(role: RoleEntity) {
  if (role.isDefault)
    throw new ConflictException(
      'Perfil padrão, não possível atualizar ou deletar!',
    );
}
