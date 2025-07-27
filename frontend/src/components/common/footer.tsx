import React from 'react'
import { Box, Typography, Container, Divider } from '@mui/material'
import { Favorite } from '@mui/icons-material'

const Footer: React.FC = () => {
  return (
    <Box className="bg-gray-800 text-white mt-auto">
      <Container maxWidth="lg">
        <Box className="py-8">
          <Box className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Box>
              <Typography variant="h6" className="font-semibold mb-2">
                FoodShare
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Connecting communities to reduce food waste
              </Typography>
            </Box>
            
            <Box className="text-center">
              <Typography variant="body2" className="text-gray-300">
                Help us build a sustainable future
              </Typography>
              <Typography variant="body2" className="text-gray-400 mt-1">
                Every shared meal makes a difference
              </Typography>
            </Box>
          </Box>
          
          <Divider className="my-4 bg-gray-600" />
          
          <Box className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <Typography variant="body2" className="text-gray-400">
              © 2024 FoodShare. Built with care for the community.
            </Typography>
            
            <Box className="flex items-center space-x-1 text-gray-400">
              <Typography variant="body2">
                Made with
              </Typography>
              <Favorite className="text-red-400 text-sm" />
              <Typography variant="body2">
                for a better tomorrow
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer