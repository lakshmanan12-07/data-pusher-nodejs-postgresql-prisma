import { Request, Response } from "express";
import { accountMemberService } from "../services";
import { CustomRequest } from "../config/auth";

const createAccountMember = async function (req: Request, res: Response) {
  try {
    const checkUser = await accountMemberService.getAccountMemberByFilter({
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
        message: "AccountMember Name already found",
      });

    const accountMember = await accountMemberService.createAccountMember(
      req.body
    );

    return res.status(200).send({
      code: 200,
      data: accountMember,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const updateAccountMember = async function (req: Request, res: Response) {
  try {
    const checkAccountMember = await accountMemberService.getAccountMemberById(
      req.params.accountMemberId
    );
    if (!checkAccountMember)
      return res.status(400).send({
        code: 400,
        message: "AccountMember not found",
      });

    const userId = (req as CustomRequest).userId;
    if (userId != checkAccountMember.userId)
      return res.status(400).send({
        code: 400,
        message: "You cannot update others AccountMember",
      });

    const accountMember = await accountMemberService.updateAccountMember(
      checkAccountMember.id,
      req.body
    );

    return res.status(200).send({
      code: 200,
      data: accountMember,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const getAccountMemberById = async function (req: Request, res: Response) {
  try {
    const checkAccountMember = await accountMemberService.getAccountMemberById(
      req.params.accountMemberId
    );
    const userId = (req as CustomRequest).userId;
    if (checkAccountMember && userId != checkAccountMember.userId)
      return res.status(400).send({
        code: 400,
        message: "This is accountMember is not available for You",
      });

    return res.status(200).send({
      code: 200,
      data: checkAccountMember,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const deleteAccountMember = async function (req: Request, res: Response) {
  try {
    const checkAccountMember = await accountMemberService.getAccountMemberById(
      req.params.accountMemberId
    );
    if (!checkAccountMember)
      return res.status(400).send({
        code: 400,
        message: "AccountMember not found",
      });
    const userId = (req as CustomRequest).userId;
    if (userId != checkAccountMember.userId)
      return res.status(400).send({
        code: 400,
        message: "You dont have access to delete this accountMember",
      });

    const accountMember = await accountMemberService.deleteAccountMember(
      checkAccountMember.id
    );

    return res.status(200).send({
      code: 200,
      data: accountMember,
    });
  } catch (error: any) {
    return res.status(500).send({
      code: 500,
      data: null,
      message: error.message,
    });
  }
};

const fetchAccountMember = async function (req: Request, res: Response) {
  try {
    const accountMembers = await accountMemberService.getAllAccountMembers(
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

    const totalAccountMemberCount =
      await accountMemberService.getAccountMembersCount({
        ...(req.body.filter ? req.body.filter : {}),
        deleted: false,
        userId: req.body.userId,
      });

    return res.status(200).send({
      code: 200,
      data: accountMembers,
      count: totalAccountMemberCount,
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
  createAccountMember,
  updateAccountMember,
  getAccountMemberById,
  deleteAccountMember,
  fetchAccountMember,
};
