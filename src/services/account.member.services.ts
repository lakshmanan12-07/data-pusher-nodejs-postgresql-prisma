import { PrismaClient, AccountMember, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new accountMember
const createAccountMember = async (
  data: Prisma.AccountMemberCreateInput
): Promise<AccountMember> => {
  const newAccountMember: AccountMember = await prisma.accountMember.create({
    data,
  });
  return newAccountMember;
};

// Get accountMember by ID
const getAccountMemberById = async (
  id: string
): Promise<AccountMember | null> => {
  const accountMember: AccountMember | null =
    await prisma.accountMember.findUnique({
      where: { id },
    });
  return accountMember;
};

// Get all accountMembers
const getAllAccountMembers = async (
  filter: object,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
  }
): Promise<AccountMember[]> => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sortBy = options?.sortBy ?? "createdAt";
  const sortType = options?.sortType ?? "desc";

  const accountMembers: AccountMember[] = await prisma.accountMember.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: sortType,
    },
  });
  return accountMembers;
};

// Update accountMember by ID
const updateAccountMember = async (
  id: string,
  data: Prisma.AccountMemberUpdateInput
): Promise<AccountMember> => {
  const updatedAccountMember: AccountMember = await prisma.accountMember.update(
    {
      where: { id },
      data,
    }
  );
  return updatedAccountMember;
};

// Delete accountMember by ID
const deleteAccountMember = async (id: string): Promise<AccountMember> => {
  const deletedAccountMember: AccountMember = await prisma.accountMember.update(
    {
      where: { id },
      data: {
        deleted: true,
      },
    }
  );
  return deletedAccountMember;
};

// Get accountMember by filter
const getAccountMemberByFilter = async (
  filter: object
): Promise<AccountMember | null> => {
  const accountMember: AccountMember | null =
    await prisma.accountMember.findFirst({
      where: { ...filter, deleted: false },
    });
  return accountMember;
};

// Get accountMember by filter
const getAccountMembersCount = async (filter: object): Promise<number> => {
  const accountMember: number = await prisma.accountMember.count({
    where: { ...filter, deleted: false },
  });
  return accountMember;
};

export default {
  deleteAccountMember,
  updateAccountMember,
  getAllAccountMembers,
  getAccountMemberById,
  createAccountMember,
  getAccountMemberByFilter,
  getAccountMembersCount,
};
