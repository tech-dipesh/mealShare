import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import foodRoutes from './routes/food.js';
import claimRoutes from './routes/claim.js';
import ratingRoutes from './routes/rating.js';
import userRoutes from './routes/user.js';
import { errorHandler } from './middleware/errorhandle.js';
import rateLimit from 'express-rate-limit'
dotenv.config({override: true});
const app = express();

app.use(helmet())
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // stricter limit for auth routes
})

app.use(limiter)
app.use('/api/auth', authLimiter)