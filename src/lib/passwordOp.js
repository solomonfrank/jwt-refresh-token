import bcrypt from "bcryptjs";

const SALT_HASH_KEY = 11;

export const hashPassword = password => bcrypt.hash(password, SALT_HASH_KEY);

export const comparePassord = (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);

export const isPasswordChanged = (jwtExpiresTime, passwordChangedAt) =>
  passwordChangedAt > jwtExpiresTime;
