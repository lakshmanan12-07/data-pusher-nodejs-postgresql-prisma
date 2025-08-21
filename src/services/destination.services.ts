import { PrismaClient, Destination, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new destination
const createDestination = async (
  data: Prisma.DestinationCreateInput
): Promise<Destination> => {
  const newDestination: Destination = await prisma.destination.create({
    data,
  });
  return newDestination;
};

// Get destination by ID
const getDestinationById = async (id: string): Promise<Destination | null> => {
  const destination: Destination | null = await prisma.destination.findUnique({
    where: { id },
  });
  return destination;
};

// Get all destinations
const getAllDestinations = async (
  filter: object,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
  }
): Promise<Destination[]> => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sortBy = options?.sortBy ?? "createdAt";
  const sortType = options?.sortType ?? "desc";

  const destinations: Destination[] = await prisma.destination.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: sortType,
    },
  });
  return destinations;
};

// Update destination by ID
const updateDestination = async (
  id: string,
  data: Prisma.DestinationUpdateInput
): Promise<Destination> => {
  const updatedDestination: Destination = await prisma.destination.update({
    where: { id },
    data,
  });
  return updatedDestination;
};

// Delete destination by ID
const deleteDestination = async (id: string): Promise<Destination> => {
  const deletedDestination: Destination = await prisma.destination.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
  return deletedDestination;
};

// Get destination by filter
const getDestinationByFilter = async (
  filter: object
): Promise<Destination | null> => {
  const destination: Destination | null = await prisma.destination.findFirst({
    where: { ...filter, deleted: false },
  });
  return destination;
};

// Get destination by filter
const getDestinationsCount = async (filter: object): Promise<number> => {
  const destination: number = await prisma.destination.count({
    where: { ...filter, deleted: false },
  });
  return destination;
};

export default {
  deleteDestination,
  updateDestination,
  getAllDestinations,
  getDestinationById,
  createDestination,
  getDestinationByFilter,
  getDestinationsCount,
};
