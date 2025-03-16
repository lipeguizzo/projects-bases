export class AddressEntity {
  id: number;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  complement?: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(partial: AddressEntity) {
    Object.assign(this, { ...partial });
  }
}
