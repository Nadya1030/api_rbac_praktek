import { UserRepository } from '../../infrastructure/database/user.repository';
import { comparePassword, hashPassword } from '../../infrastructure/security/bcrypt';

const repo = new UserRepository();

export class ChangePasswordUseCase {
  async execute(userId: string, oldPassword: string, newPassword: string) {
    const user = await repo.findById(userId);
    if (!user) throw new Error('User tidak ditemukan');

    const valid = await comparePassword(oldPassword, user.password);
    if (!valid) throw new Error('Password lama tidak sesuai');

    const hashed = await hashPassword(newPassword);
    await repo.updatePassword(userId, hashed);

    return { message: 'Password berhasil diubah' };
  }
}