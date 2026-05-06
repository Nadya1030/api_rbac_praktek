import { prisma } from './prisma.client';
import type { UserEntity } from '../../core/entities/user.entity';

interface CreateUserData {
  email: string;
  password: string;
  roleId: string;
}

export class UserRepository {
  async findAll(): Promise<UserEntity[]> {
    return prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  async create(data: CreateUserData): Promise<UserEntity> {
    return prisma.user.create({
      data,
      include: { role: true },
    });
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}