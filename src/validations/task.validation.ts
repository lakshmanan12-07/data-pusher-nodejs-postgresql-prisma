import { TaskStatus } from "@prisma/client";
import Joi from "joi";

const createTask = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    userId: Joi.string().required(),
    status: Joi.string()
      .valid(TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED)
      .required(),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      status: Joi.string()
        .valid(TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED)
        .optional(),
    })
    .min(1),
};

const fetchTask = {
  body: Joi.object().keys({
    filter: Joi.object().optional(),
    userId: Joi.string().required(),
    limit: Joi.number().optional(),
    page: Joi.number().optional(),
    sortBy: Joi.string().optional(),
    sortType: Joi.string().optional(),
  }),
};

const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required(),
  }),
};

export default {
  createTask,
  updateTask,
  fetchTask,
  getTask,
};
