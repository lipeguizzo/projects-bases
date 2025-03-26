import { IGithubBranchItem } from './../domain/interfaces/github-branch-item.interface';
import { Repository } from '@/http/repository';

export class GithubRepository extends Repository {
  constructor() {
    super('/repos');
  }

  public async findRepositoryBranches(
    owner: string,
    repo: string,
  ): Promise<IGithubBranchItem[]> {
    const { status, data } = await this.http.get<IGithubBranchItem[]>(
      `/${owner}/${repo}/branches`,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }
}
