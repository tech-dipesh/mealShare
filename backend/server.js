import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import foodRoutes from './routes/food.js';
import claimRoutes from './routes/claim.js';
import ratingRoutes from './routes/rating.js';
import userRoutes from './routes/user.js';
import { errorHandler } from './middleware/errorhandle.js';

dotenv.config();
const app = express();

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