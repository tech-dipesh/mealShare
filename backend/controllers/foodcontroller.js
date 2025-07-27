import Food from '../models/Food.js';
import { validationResult } from 'express-validator';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllFood = async (req, res) => {
  try {
    const { search, status, sortBy, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { foodName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { posterName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    let sortOptions = {};
    switch (sortBy) {
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'oldest':
        sortOptions.createdAt = 1;
        break;
      case 'cost_low':
        sortOptions.cost = 1;
        break;
      case 'cost_high':
        sortOptions.cost = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const foods = await Food.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Food.countDocuments(query);
    
    return successResponse(res, {
      foods,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    }, 'Food items retrieved successfully');
  } catch (error) {
    return errorResponse(res, 'Error retrieving food items', 500);
  }
};

export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return errorResponse(res, 'Food item not found', 404);
    }
    
    return successResponse(res, food, 'Food item retrieved successfully');
  } catch (error) {
    if (error.name === 'CastError') {
      return errorResponse(res, 'Invalid food item ID', 400);
    }
    return errorResponse(res, 'Error retrieving food item', 500);
  }
};

export const createFood = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validation errors', 400, errors.array());
    }
    
    const food = new Food(req.body);
    const savedFood = await food.save();
    
    return successResponse(res, savedFood, 'Food item created successfully', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return errorResponse(res, 'Validation failed', 400, validationErrors);
    }
    return errorResponse(res, 'Error creating food item', 500);
  }
};

export const updateFoodStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['available', 'claimed'].includes(status)) {
      return errorResponse(res, 'Invalid status value', 400);
    }
    
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!food) {
      return errorResponse(res, 'Food item not found', 404);
    }
    
    return successResponse(res, food, 'Food status updated successfully');
  } catch (error) {
    if (error.name === 'CastError') {
      return errorResponse(res, 'Invalid food item ID', 400);
    }
    return errorResponse(res, 'Error updating food status', 500);
  }
};

export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    
    if (!food) {
      return errorResponse(res, 'Food item not found', 404);
    }
    
    return successResponse(res, null, 'Food item deleted successfully');
  } catch (error) {
    if (error.name === 'CastError') {
      return errorResponse(res, 'Invalid food item ID', 400);
    }
    return errorResponse(res, 'Error deleting food item', 500);
  }
};

export const getFoodStats = async (req, res) => {
  try {
    const totalFood = await Food.countDocuments();
    const availableFood = await Food.countDocuments({ status: 'available' });
    const claimedFood = await Food.countDocuments({ status: 'claimed' });
    
    const stats = {
      total: totalFood,
      available: availableFood,
      claimed: claimedFood
    };
    
    return successResponse(res, stats, 'Food statistics retrieved successfully');
  } catch (error) {
    return errorResponse(res, 'Error retrieving food statistics', 500);
  }
};