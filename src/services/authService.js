import Model from "../models";
import _ from "lodash";
import { findOrCreate } from "./index";
import { hashPassword } from "../lib/passwordOp";
import catchAsync from "../lib/catchAsync";

const { Account } = Model;

export const signupService = catchAsync(async (req, res, next) => {
  const password = await hashPassword(req.body.password);

  const email = req.body.email.toLowerCase();

  const [account, created] = await findOrCreate(Account, {
    ...req.body,
    password,
    email
  });

  if (!created) {
    return res.status(400).json({
      status: "fail",
      message: "user already exist"
    });
  }
  return res.status(201).json({
    status: "success",
    message: "user successfully created",
    payload: _.omit(account.toJSON(), ["password"])
  });
});
