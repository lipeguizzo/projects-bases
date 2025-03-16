import { prisma } from '../../../infra/database/prisma.service';
import { NotFoundException } from '../../../shared/exceptions';

export async function companyExistingValidator(companyId: number) {
  const company = await prisma.company.findFirst({
    where: {
      id: companyId,
    },
  });

  if (!company) throw new NotFoundException('Empresa não encontrada!');
}
