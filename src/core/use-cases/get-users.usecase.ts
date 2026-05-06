import { UserRepository } from '../../infrastructure/database/user.repository';

const repo = new UserRepository();

export class GetUsersUseCase {
  async execute() {
    const users = await repo.findAll();
    // Hapus password dari semua user
    return users.map(({ password, ...user }) => user);
  }
}