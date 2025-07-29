import { jwtSecret } from '../config/jwt.js'
import { unauthorized } from '../utils/response.js'

// export const auth = (req, res, next) => {
//   const header = req.headers.authorization
//   if (!header) return unauthorized(res, 'Missing token')
//   const token = header.split(' ')[1]  // split bearer
//   jwt.verify(token, jwtSecret, (err, payload) => {
//     if (err) return unauthorized(res, 'Invalid token')
//     req.user = payload
//     next()
//   })
// }

export const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return unauthorized(res, 'Missing token');
  const token = header.split(' ')[1];
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    unauthorized(res, 'Invalid token');
  }
};
