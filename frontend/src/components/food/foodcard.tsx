// import * as React from "react";
// import React from "react";
import * as React from "react";



import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Phone,
  LocationOn,
  AccessTime,
  Delete,
  PersonPin,
} from "@mui/icons-material";
import { FoodItem } from "../types/food";
import { formatTimeAgo, formatCurrency } from "../utils/formatdata";
import { useFoodItems } from "../hooks/usefooditmes";

interface FoodCardProps {
  food: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { deleteFood, updateFoodStatus, isUserPost } = useFoodItems();
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [contactDialog, setContactDialog] = React.useState<boolean>(false);

  const handleDelete = async (): Promise<void> => {
    const success = await deleteFood(food._id);
    if (success) {
      setDeleteDialog(false);
    }
  };

  const handleClaim = async (): Promise<void> => {
    await updateFoodStatus(food._id, "claimed");
  };

  const handleMarkAvailable = async (): Promise<void> => {
    await updateFoodStatus(food._id, "available");
  };

  const isAvailable: boolean = food.status === "available";
  const userOwnsPost: boolean = isUserPost(food._id);

  return (
    <>
      <Card className="h-full shadow-soft hover:shadow-medium transition-shadow duration-200">
        <CardContent className="p-4 space-y-3">
          <Box className="flex justify-between items-start">
            <Typography
              variant="h6"
              className="font-semibold text-gray-800 flex-1"
            >
              {food.foodName}
            </Typography>
            <Box className="flex items-center space-x-1">
              <Chip
                label={food.status}
                size="small"
                className={
                  isAvailable
                    ? "bg-success-100 text-success-700"
                    : "bg-warning-100 text-warning-700"
                }
              />
              {userOwnsPost && (
                <IconButton
                  size="small"
                  onClick={() => setDeleteDialog(true)}
                  className="text-error-600 hover:bg-error-50"
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Box className="space-y-2">
            <Box className="flex items-center space-x-2">
              <Typography variant="body2" className="font-medium text-gray-600">
                Quantity: {food.totalItems} items
              </Typography>
              <Typography
                variant="body2"
                className="font-bold text-primary-600"
              >
                {formatCurrency(food.cost)}
              </Typography>
            </Box>

            {food.description && (
              <Typography
                variant="body2"
                className="text-gray-600 line-clamp-2"
              >
                {food.description}
              </Typography>
            )}

            <Box className="flex items-center space-x-1 text-gray-500">
              <PersonPin fontSize="small" />
              <Typography variant="body2">{food.posterName}</Typography>
            </Box>

            <Box className="flex items-center space-x-1 text-gray-500">
              <LocationOn fontSize="small" />
              <Typography variant="body2" className="line-clamp-1">
                {food.address}
              </Typography>
            </Box>

            <Box className="flex items-center space-x-1 text-gray-500">
              <AccessTime fontSize="small" />
              <Typography variant="body2">
                {formatTimeAgo(food.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Box className="flex gap-2 pt-2">
            {isAvailable ? (
              <Button
                variant="contained"
                startIcon={<Phone />}
                onClick={() => setContactDialog(true)}
                className="flex-1 bg-primary-600 hover:bg-primary-700"
                size="small"
              >
                Contact
              </Button>
            ) : (
              userOwnsPost && (
                <Button
                  variant="outlined"
                  onClick={handleMarkAvailable}
                  className="flex-1 text-success-600 border-success-600 hover:bg-success-50"
                  size="small"
                >
                  Mark Available
                </Button>
              )
            )}

            {isAvailable && !userOwnsPost && (
              <Button
                variant="outlined"
                onClick={handleClaim}
                className="text-warning-600 border-warning-600 hover:bg-warning-50"
                size="small"
              >
                Claim
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog open={contactDialog} onClose={() => setContactDialog(false)}>
        <DialogTitle>Contact Information</DialogTitle>
        <DialogContent className="space-y-3">
          <Box>
            <Typography variant="subtitle2" className="font-semibold">
              Food Item:
            </Typography>
            <Typography variant="body2">{food.foodName}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="font-semibold">
              Posted by:
            </Typography>
            <Typography variant="body2">{food.posterName}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="font-semibold">
              Phone:
            </Typography>
            <Typography variant="body2">{food.phoneNumber}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" className="font-semibold">
              Address:
            </Typography>
            <Typography variant="body2">{food.address}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialog(false)}>Close</Button>
          <Button
            href={`tel:${food.phoneNumber}`}
            variant="contained"
            startIcon={<Phone />}
          >
            Call Now
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Food Item</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{food.foodName}"? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FoodCard;
