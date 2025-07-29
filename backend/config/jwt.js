import jwt from 'jsonwebtoken';

export const jwtSecret = process.env.JWT_SECRET;

export const signToken = (payload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN });

export const verifyToken = (token) =>
  jwt.verify(token, jwtSecret);
