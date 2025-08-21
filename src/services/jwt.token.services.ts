import { PrismaClient, JwtToken, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new jwtToken
const createJwtToken = async (
  data: Prisma.JwtTokenCreateInput
): Promise<JwtToken> => {
  const newJwtToken: JwtToken = await prisma.jwtToken.create({
    data,
  });
  return newJwtToken;
};

// Get jwtToken by ID
const getJwtTokenById = async (id: string): Promise<JwtToken | null> => {
  const jwtToken: JwtToken | null = await prisma.jwtToken.findUnique({
    where: { id },
  });
  return jwtToken;
};

// Get all jwtTokens
const getAllJwtTokens = async (
  filter: object,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
  }
): Promise<JwtToken[]> => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sortBy = options?.sortBy ?? "createdAt";
  const sortType = options?.sortType ?? "desc";

  const jwtTokens: JwtToken[] = await prisma.jwtToken.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: sortType,
    },
  });
  return jwtTokens;
};

// Update jwtToken by ID
const updateJwtToken = async (
  id: string,
  data: Prisma.JwtTokenUpdateInput
): Promise<JwtToken> => {
  const updatedJwtToken: JwtToken = await prisma.jwtToken.update({
    where: { id },
    data,
  });
  return updatedJwtToken;
};

// Delete jwtToken by ID
const deleteJwtToken = async (id: string): Promise<JwtToken> => {
  const deletedJwtToken: JwtToken = await prisma.jwtToken.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
  return deletedJwtToken;
};

// Get jwtToken by filter
const getJwtTokenByFilter = async (
  filter: object
): Promise<JwtToken | null> => {
  const jwtToken: JwtToken | null = await prisma.jwtToken.findFirst({
    where: { ...filter, deleted: false },
  });
  return jwtToken;
};

// Get jwtToken by filter
const getJwtTokensCount = async (filter: object): Promise<number> => {
  const jwtToken: number = await prisma.jwtToken.count({
    where: { ...filter, deleted: false },
  });
  return jwtToken;
};

export default {
  deleteJwtToken,
  updateJwtToken,
  getAllJwtTokens,
  getJwtTokenById,
  createJwtToken,
  getJwtTokenByFilter,
  getJwtTokensCount,
};
