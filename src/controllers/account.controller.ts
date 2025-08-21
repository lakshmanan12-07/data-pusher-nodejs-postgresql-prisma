import { Request, Response } from "express";
import { accountService } from "../services";
import { CustomRequest } from "../config/auth";

const createAccount = async function (req: Request, res: Response) {
  try {
    const checkUser = await accountService.getAccountByFilter({
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
        message: "Account Name already found",
      });

    const account = await accountService.createAccount(req.body);

    return res.status(200).send({
      code: 200,
      data: account,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const updateAccount = async function (req: Request, res: Response) {
  try {
    const checkAccount = await accountService.getAccountById(
      req.params.accountId
    );
    if (!checkAccount)
      return res.status(400).send({
        code: 400,
        message: "Account not found",
      });

    const userId = (req as CustomRequest).userId;
    if (userId != checkAccount.userId)
      return res.status(400).send({
        code: 400,
        message: "You cannot update others Account",
      });

    const account = await accountService.updateAccount(
      checkAccount.id,
      req.body
    );

    return res.status(200).send({
      code: 200,
      data: account,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const getAccountById = async function (req: Request, res: Response) {
  try {
    const checkAccount = await accountService.getAccountById(
      req.params.accountId
    );
    const userId = (req as CustomRequest).userId;
    if (checkAccount && userId != checkAccount.userId)
      return res.status(400).send({
        code: 400,
        message: "This is account is not available for You",
      });

    return res.status(200).send({
      code: 200,
      data: checkAccount,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const deleteAccount = async function (req: Request, res: Response) {
  try {
    const checkAccount = await accountService.getAccountById(
      req.params.accountId
    );
    if (!checkAccount)
      return res.status(400).send({
        code: 400,
        message: "Account not found",
      });
    const userId = (req as CustomRequest).userId;
    if (userId != checkAccount.userId)
      return res.status(400).send({
        code: 400,
        message: "You dont have access to delete this account",
      });

    const account = await accountService.deleteAccount(checkAccount.id);

    return res.status(200).send({
      code: 200,
      data: account,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const fetchAccount = async function (req: Request, res: Response) {
  try {
    const accounts = await accountService.getAllAccounts(
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

    const totalAccountCount = await accountService.getAccountsCount({
      ...(req.body.filter ? req.body.filter : {}),
      deleted: false,
      userId: req.body.userId,
    });

    return res.status(200).send({
      code: 200,
      data: accounts,
      count: totalAccountCount,
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
  createAccount,
  updateAccount,
  getAccountById,
  deleteAccount,
  fetchAccount,
};
