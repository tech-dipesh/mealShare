import React, { useState } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { Add } from '@mui/icons-material'
import FoodList from '../components/food/foodlist'
import CreateFood from '../components/food/createfood'

const Home: React.FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <Box className="min-h-screen bg-gray-50">
      <Container maxWidth="lg" className="py-8">
        <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <Box>
            <Typography variant="h3" className="font-bold text-gray-800 mb-2">
              Share Food, Reduce Waste
            </Typography>
            <Typography variant="h6" className="text-gray-600">
              Connect with your community to share excess food locally
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCreateDialogOpen(true)}
            className="bg-primary-600 hover:bg-primary-700 px-6 py-3 text-lg"
            size="large"
          >
            Post Food
          </Button>
        </Box>

        <FoodList />
        
        <CreateFood 
          open={createDialogOpen} 
          onClose={() => setCreateDialogOpen(false)} 
        />
      </Container>
    </Box>
  )
}

export default Home