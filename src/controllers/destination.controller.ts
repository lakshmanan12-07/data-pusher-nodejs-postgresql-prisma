import { Request, Response } from "express";
import { destinationService } from "../services";
import { CustomRequest } from "../config/auth";

const createDestination = async function (req: Request, res: Response) {
  try {
    const checkUser = await destinationService.getDestinationByFilter({
      deleted: false,
      name: {
        equals: req.body.name,
        mode: "insensitive",
      },
      userId: req.body.userId,
    });
    if (checkUser)
      return res.status(400).send({
        code: 400,
        message: "Destination Name already found",
      });

    const destination = await destinationService.createDestination(req.body);

    return res.status(200).send({
      code: 200,
      data: destination,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const updateDestination = async function (req: Request, res: Response) {
  try {
    const checkDestination = await destinationService.getDestinationById(
      req.params.destinationId
    );
    if (!checkDestination)
      return res.status(400).send({
        code: 400,
        message: "Destination not found",
      });

    const userId = (req as CustomRequest).userId;
    if (userId != checkDestination.userId)
      return res.status(400).send({
        code: 400,
        message: "You cannot update others Destination",
      });

    const destination = await destinationService.updateDestination(
      checkDestination.id,
      req.body
    );

    return res.status(200).send({
      code: 200,
      data: destination,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const getDestinationById = async function (req: Request, res: Response) {
  try {
    const checkDestination = await destinationService.getDestinationById(
      req.params.destinationId
    );
    const userId = (req as CustomRequest).userId;
    if (checkDestination && userId != checkDestination.userId)
      return res.status(400).send({
        code: 400,
        message: "This is destination is not available for You",
      });

    return res.status(200).send({
      code: 200,
      data: checkDestination,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const deleteDestination = async function (req: Request, res: Response) {
  try {
    const checkDestination = await destinationService.getDestinationById(
      req.params.destinationId
    );
    if (!checkDestination)
      return res.status(400).send({
        code: 400,
        message: "Destination not found",
      });
    const userId = (req as CustomRequest).userId;
    if (userId != checkDestination.userId)
      return res.status(400).send({
        code: 400,
        message: "You dont have access to delete this destination",
      });

    const destination = await destinationService.deleteDestination(
      checkDestination.id
    );

    return res.status(200).send({
      code: 200,
      data: destination,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const fetchDestination = async function (req: Request, res: Response) {
  try {
    const destinations = await destinationService.getAllDestinations(
      {
        ...(req.body.filter ? req.body.filter : {}),
        deleted: false,
        userId: req.body.userId,
      },
      {
        limit: req.body.limit,
        page: req.body.page,
        sortBy: req.body.sortBy,
        sortType: req.body.sortType,
      }
    );

    const totalDestinationCount = await destinationService.getDestinationsCount(
      {
        ...(req.body.filter ? req.body.filter : {}),
        deleted: false,
        userId: req.body.userId,
      }
    );

    return res.status(200).send({
      code: 200,
      data: destinations,
      count: totalDestinationCount,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

export default {
  createDestination,
  updateDestination,
  getDestinationById,
  deleteDestination,
  fetchDestination,
};
