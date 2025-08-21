import { PrismaClient, DestinationHeader, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new destinationHeader
const createDestinationHeader = async (
  data: Prisma.DestinationHeaderCreateInput
): Promise<DestinationHeader> => {
  const newDestinationHeader: DestinationHeader =
    await prisma.destinationHeader.create({
      data,
    });
  return newDestinationHeader;
};

// Get destinationHeader by ID
const getDestinationHeaderById = async (
  id: string
): Promise<DestinationHeader | null> => {
  const destinationHeader: DestinationHeader | null =
    await prisma.destinationHeader.findUnique({
      where: { id },
    });
  return destinationHeader;
};

// Get all destinationHeaders
const getAllDestinationHeaders = async (
  filter: object,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
  }
): Promise<DestinationHeader[]> => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sortBy = options?.sortBy ?? "createdAt";
  const sortType = options?.sortType ?? "desc";

  const destinationHeaders: DestinationHeader[] =
    await prisma.destinationHeader.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortType,
      },
    });
  return destinationHeaders;
};

// Update destinationHeader by ID
const updateDestinationHeader = async (
  id: string,
  data: Prisma.DestinationHeaderUpdateInput
): Promise<DestinationHeader> => {
  const updatedDestinationHeader: DestinationHeader =
    await prisma.destinationHeader.update({
      where: { id },
      data,
    });
  return updatedDestinationHeader;
};

// Delete destinationHeader by ID
const deleteDestinationHeader = async (
  id: string
): Promise<DestinationHeader> => {
  const deletedDestinationHeader: DestinationHeader =
    await prisma.destinationHeader.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  return deletedDestinationHeader;
};

// Get destinationHeader by filter
const getDestinationHeaderByFilter = async (
  filter: object
): Promise<DestinationHeader | null> => {
  const destinationHeader: DestinationHeader | null =
    await prisma.destinationHeader.findFirst({
      where: { ...filter, deleted: false },
    });
  return destinationHeader;
};

// Get destinationHeader by filter
const getDestinationHeadersCount = async (filter: object): Promise<number> => {
  const destinationHeader: number = await prisma.destinationHeader.count({
    where: { ...filter, deleted: false },
  });
  return destinationHeader;
};

export default {
  deleteDestinationHeader,
  updateDestinationHeader,
  getAllDestinationHeaders,
  getDestinationHeaderById,
  createDestinationHeader,
  getDestinationHeaderByFilter,
  getDestinationHeadersCount,
};
