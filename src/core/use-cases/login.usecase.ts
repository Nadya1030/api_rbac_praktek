import { UserRepository } from '../../infrastructure/database/user.repository';
import { comparePassword } from '../../infrastructure/security/bcrypt';
import { signToken } from '../../infrastructure/security/jwt';

const repo = new UserRepository();

export class LoginUseCase {
  async execute(email: string, password: string) {
    const user = await repo.findByEmail(email);

    // Pesan error dibuat sama agar tidak bocorkan info (email valid/tidak)
    if (!user) throw new Error('Email atau password salah');

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error('Email atau password salah');

    return signToken({
      id: user.id,
      role: user.role.name,
    });
  }
}