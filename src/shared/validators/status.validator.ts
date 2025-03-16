import { UnauthorizedException } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export async function statusValidator(status: $Enums.Status) {
  if (status === $Enums.Status.BLOCKED)
    throw new UnauthorizedException('Status bloqueado!');

  if (status === $Enums.Status.WAITING)
    throw new UnauthorizedException('Status em espera!');

  if (status === $Enums.Status.DISABLED)
    throw new UnauthorizedException('Status em desabilitado!');
}
