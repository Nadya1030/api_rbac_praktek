import { UserRepository } from '../../infrastructure/database/user.repository';

const repo = new UserRepository();

export class DeleteUserUseCase {
  async execute(targetId: string, requesterId: string) {
    if (targetId === requesterId) {
      throw new Error('Tidak bisa menghapus akun sendiri');
    }

    const user = await repo.findById(targetId);
    if (!user) throw new Error('User tidak ditemukan');

    await repo.deleteById(targetId);
    return { message: 'User berhasil dihapus' };
  }
}