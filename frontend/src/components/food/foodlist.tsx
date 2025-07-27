import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Typography,
  Chip,
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
// import { useFoodItems } from '../../hooks/usefooditems'
import { FoodFilters } from "../types/food";
import { useFoodItems } from "../hooks/usefooditmes.tsx";
import FoodCard from "./foodcard";
import Loading from "../common/loading";

const FoodList: React.FC = () => {
  const { foods, loading, pagination, fetchFoods } = useFoodItems();
  const [filters, setFilters] = useState<FoodFilters>({
    search: "",
    status: "all",
    sortBy: "newest",
    page: 1,
    limit: 12,
  });

  const handleFilterChange = (key: keyof FoodFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    if (key !== "page") {
      newFilters.page = 1;
    }
    setFilters(newFilters);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    handleFilterChange("page", page);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchFoods(filters);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters, fetchFoods]);

  if (loading) {
    return <Loading message="Loading food items..." />;
  }

  return (
    <Box className="space-y-6">
      <Box className="flex flex-col sm:flex-row gap-4 items-center">
        <TextField
          placeholder="Search food items..."
          value={filters.search || ""}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="flex-1"
          size="small"
        />

        <Box className="flex gap-2">
          <FormControl size="small" className="min-w-32">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status || "all"}
              label="Status"
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="claimed">Claimed</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" className="min-w-32">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy || "newest"}
              label="Sort By"
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="cost_low">Price: Low to High</MenuItem>
              <MenuItem value="cost_high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className="flex items-center justify-between">
        <Typography variant="h6" className="text-gray-800">
          Available Food Items
          <Chip
            label={pagination.total}
            size="small"
            className="ml-2 bg-primary-100 text-primary-700"
          />
        </Typography>

        {(filters.search || filters.status !== "all") && (
          <Box className="flex items-center space-x-2">
            <FilterList className="text-gray-500" />
            <Typography variant="body2" className="text-gray-500">
              Filters applied
            </Typography>
          </Box>
        )}
      </Box>

      {foods.length === 0 ? (
        <Box className="text-center py-12">
          <Typography variant="h6" className="text-gray-500 mb-2">
            No food items found
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Try adjusting your search or filters
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {foods.map((food) => (
              <Grid item xs={12} sm={6} lg={4} key={food._id}>
                <FoodCard food={food} />
              </Grid>
            ))}
          </Grid>

          {pagination.pages > 1 && (
            <Box className="flex justify-center mt-8">
              <Pagination
                count={pagination.pages}
                page={pagination.current}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default FoodList;
