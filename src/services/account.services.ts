import { PrismaClient, Account, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new account
const createAccount = async (
  data: Prisma.AccountCreateInput
): Promise<Account> => {
  const newAccount: Account = await prisma.account.create({ data });
  return newAccount;
};

// Get account by ID
const getAccountById = async (id: string): Promise<Account | null> => {
  const account: Account | null = await prisma.account.findUnique({
    where: { id },
  });
  return account;
};

// Get all accounts
const getAllAccounts = async (
  filter: object,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
  }
): Promise<Account[]> => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sortBy = options?.sortBy ?? "createdAt";
  const sortType = options?.sortType ?? "desc";

  const accounts: Account[] = await prisma.account.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: sortType,
    },
  });
  return accounts;
};

// Update account by ID
const updateAccount = async (
  id: string,
  data: Prisma.AccountUpdateInput
): Promise<Account> => {
  const updatedAccount: Account = await prisma.account.update({
    where: { id },
    data,
  });
  return updatedAccount;
};

// Delete account by ID
const deleteAccount = async (id: string): Promise<Account> => {
  const deletedAccount: Account = await prisma.account.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
  return deletedAccount;
};

// Get account by filter
const getAccountByFilter = async (filter: object): Promise<Account | null> => {
  const account: Account | null = await prisma.account.findFirst({
    where: { ...filter, deleted: false },
  });
  return account;
};

// Get account by filter
const getAccountsCount = async (filter: object): Promise<number> => {
  const account: number = await prisma.account.count({
    where: { ...filter, deleted: false },
  });
  return account;
};

export default {
  deleteAccount,
  updateAccount,
  getAllAccounts,
  getAccountById,
  createAccount,
  getAccountByFilter,
  getAccountsCount,
};
