import React from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { Restaurant } from '@mui/icons-material'

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="bg-white shadow-soft">
      <Toolbar className="px-4">
        <Box className="flex items-center space-x-2 flex-1">
          <Restaurant className="text-primary-600 text-3xl" />
          <Typography
            variant="h5"
            component="div"
            className="font-bold text-gray-800"
          >
            FoodShare
          </Typography>
        </Box>
        
        <Box className="flex items-center space-x-4">
          <Typography variant="body2" className="text-gray-600 hidden sm:block">
            Reduce Food Waste, Share Locally
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            className="text-primary-600 border-primary-600 hover:bg-primary-50"
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header