import _ from "lodash";
import { findAll } from "../services";
import Model from "../models";
import catchAsync from "../lib/catchAsync";

const { Account } = Model;

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await findAll(Account);
  const body = users.map(user => _.omit(user, ["password"]));

  return res.status(200).json({
    status: "success",
    payload: users
  });
});
