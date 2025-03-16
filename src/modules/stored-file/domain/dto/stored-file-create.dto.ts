export class StoredFileCreateDto {
  name?: string;
  relativePath: string;
  alt: string;
  isPublic?: boolean = true;
}
