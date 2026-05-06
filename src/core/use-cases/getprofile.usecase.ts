import { UserRepository, toSafeUser } from '../../infrastructure/database/user.repository';
import type { SafeUser } from '../entities/user.entity';

const repo = new UserRepository();

export class GetProfileUseCase {
  async execute(userId: string): Promise<SafeUser> {
    const user = await repo.findById(userId);
    if (!user) throw new Error('User tidak ditemukan');
    return toSafeUser(user);
  }
}