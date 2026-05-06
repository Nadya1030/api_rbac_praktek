import { UserRepository, toSafeUser } from '../../infrastructure/database/user.repository';
import { hashPassword } from '../../infrastructure/security/bcrypt';
import type { SafeUser } from '../entities/user.entity';

const repo = new UserRepository();

export class RegisterUseCase {
  async execute(email: string, password: string, roleId: string): Promise<SafeUser> {
    const exist = await repo.findByEmail(email);
    if (exist) throw new Error('Email sudah terdaftar');

    const hashed = await hashPassword(password);
    const user = await repo.create({ email, password: hashed, roleId });
    return toSafeUser(user);
  }
}