// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import Model from "../models";

import GlobalError from "../lib/globalError";

import { findUser } from "../services/index";
import { comparePassord } from "../lib/passwordOp";

const { Account } = Model;

export const signinAuth = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUser(Account, email);

  if (!user) {
    return next(new GlobalError("Invalid credential", 400));
  }

  if (!(await comparePassord(password, user.password))) {
    return next(new GlobalError("Invalid credential", 400));
  }

  if (user && user.toJSON().blocked) {
    return next(
      new GlobalError(
        "Account is blocked, please contact the system administrator",
        401
      )
    );
  }

  req.user = user.toJSON();
  next();
};
