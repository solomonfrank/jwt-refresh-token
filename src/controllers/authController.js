import _ from "lodash";
import { signupService } from "../services/authService";
import { createTokens } from "../lib/generateToken";
import catchAsync from "../lib/catchAsync";
import { createCookie } from "../lib/createCookie";

export const signupController = catchAsync(async (req, res, next) => {
  await signupService(req, res, next);
});

export const signinController = async (req, res) => {
  const refreshSecret = process.env.JWT_REFRESH_KEY + req.user.password; // 1
  const [token, refreshToken] = createTokens(
    //2
    {
      id: req.user.id,
      verified: req.user.verified,
      blocked: req.user.blocked,
      role: req.user.role
    },
    refreshSecret
  );
  const payload = { ...req.user, token, refreshToken };
  createCookie(res, token, "__act", process.env.JWT_ACCESS_TOKEN_EXPIRES);
  createCookie(
    // 3
    res,
    refreshToken,
    "__rt",
    process.env.JWT_REFRESH_TOKEN_EXPIRES
  );
  return res.status(200).json({
    status: "success",
    message: "Login successfully",
    payload: _.omit(payload, ["password"])
  });
};
