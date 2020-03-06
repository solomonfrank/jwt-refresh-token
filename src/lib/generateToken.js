import jwt from "jsonwebtoken";
import { promisify } from "util";
import _ from "lodash";
import { findByPk } from "../services";
import Model from "../models";
import GlobalError from "../lib/catchAsync";

const { Account } = Model;

export const createToken = (payload, secretKey, expiresIn) =>
  jwt.sign(payload, secretKey, {
    expiresIn,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER
  });
export const createTokens = (payload, refreshSecret) => {
  const token = createToken(
    payload,
    process.env.JWT_SECRET_KEY,
    `${process.env.JWT_ACCESS_TOKEN_EXPIRES}`
  );
  const refreshToken = createToken(
    payload,
    refreshSecret,
    `${process.env.JWT_REFRESH_TOKEN_EXPIRES}`
  );

  return [token, refreshToken];
};

export const jwtVerifyToken = token =>
  jwt.verify(token, process.env.JWT_SECRET_KEY);

export const refreshToken = async (__rt, next) => {
  const decoded = jwt.decode(__rt);

  if (!decoded.id) {
    return next(new GlobalError("unAuthorize, please login", 401));
  }
  const freshUser = await findByPk(Account, decoded.id);

  if (!freshUser) {
    return next(new GlobalError("user does not exist", 401));
  }

  const refreshSecret =
    process.env.JWT_REFRESH_KEY + freshUser.toJSON().password;

  try {
    await promisify(jwt.verify)(__rt, refreshSecret);
  } catch (err) {
    return next(
      new GlobalError("you are not logged in from refreshtoken", 401)
    );
  }

  const [token, refreshToken] = createTokens(
    _.pick(freshUser.toJSON(), ["id", "verified", "blocked", "role"]),
    refreshSecret
  );

  if (token && refreshToken) {
    return {
      accessToken: token,
      newRefreshToken: refreshToken
    };
  }
};
