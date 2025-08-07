import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3,
        backgroundColor: 'primary.main', 
        color: 'white',
        textAlign: 'center',
        marginTop: 'auto'
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Coffee Shop - All rights reserved
      </Typography>
    </Box>
  );
};