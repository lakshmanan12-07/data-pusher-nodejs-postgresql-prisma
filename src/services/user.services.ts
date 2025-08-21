import { PrismaClient, User, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new user
const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
  const newUser: User = await prisma.user.create({ data });
  return newUser;
};

// Get user by ID
const getUserById = async (id: string): Promise<User | null> => {
  const user: User | null = await prisma.user.findUnique({ where: { id } });
  return user;
};

// Get all users
const getAllUsers = async (
  filter: object,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
  }
): Promise<User[]> => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sortBy = options?.sortBy ?? "createdAt";
  const sortType = options?.sortType ?? "desc";

  const users: User[] = await prisma.user.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: sortType,
    },
  });
  return users;
};

// Update user by ID
const updateUser = async (
  id: string,
  data: Prisma.UserUpdateInput
): Promise<User> => {
  const updatedUser: User = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
};

// Delete user by ID
const deleteUser = async (id: string): Promise<User> => {
  const deletedUser: User = await prisma.user.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
  return deletedUser;
};

// Get user by filter
const getUserByFilter = async (filter: object): Promise<User | null> => {
  const user: User | null = await prisma.user.findFirst({
    where: { ...filter, deleted: false },
  });
  return user;
};

export default {
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  createUser,
  getUserByFilter,
};
