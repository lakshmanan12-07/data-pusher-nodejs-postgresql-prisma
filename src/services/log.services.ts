import { PrismaClient, Log, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new log
const createLog = async (data: Prisma.LogCreateInput): Promise<Log> => {
  const newLog: Log = await prisma.log.create({
    data,
  });
  return newLog;
};

// Get log by ID
const getLogById = async (id: string): Promise<Log | null> => {
  const log: Log | null = await prisma.log.findUnique({
    where: { id },
  });
  return log;
};

// Get all logs
const getAllLogs = async (
  filter: object,
  options?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortType?: string;
  }
): Promise<Log[]> => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sortBy = options?.sortBy ?? "createdAt";
  const sortType = options?.sortType ?? "desc";

  const logs: Log[] = await prisma.log.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortBy]: sortType,
    },
  });
  return logs;
};

// Update log by ID
const updateLog = async (
  id: string,
  data: Prisma.LogUpdateInput
): Promise<Log> => {
  const updatedLog: Log = await prisma.log.update({
    where: { id },
    data,
  });
  return updatedLog;
};

// Delete log by ID
const deleteLog = async (id: string): Promise<Log> => {
  const deletedLog: Log = await prisma.log.update({
    where: { id },
    data: {
      deleted: true,
    },
  });
  return deletedLog;
};

// Get log by filter
const getLogByFilter = async (filter: object): Promise<Log | null> => {
  const log: Log | null = await prisma.log.findFirst({
    where: { ...filter, deleted: false },
  });
  return log;
};

// Get log by filter
const getLogsCount = async (filter: object): Promise<number> => {
  const log: number = await prisma.log.count({
    where: { ...filter, deleted: false },
  });
  return log;
};

export default {
  deleteLog,
  updateLog,
  getAllLogs,
  getLogById,
  createLog,
  getLogByFilter,
  getLogsCount,
};
