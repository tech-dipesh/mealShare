import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingProps {
  message?: string
  size?: number
  fullScreen?: boolean
}

const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  size = 40, 
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : 'flex items-center justify-center py-8'

  return (
    <Box className={containerClass}>
      <Box className="flex flex-col items-center space-y-3">
        <CircularProgress size={size} className="text-primary-600" />
        <Typography variant="body2" className="text-gray-600">
          {message}
        </Typography>
      </Box>
    </Box>
  )
}

export default Loading