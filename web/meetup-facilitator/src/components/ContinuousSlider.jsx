import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function ContinuousSlider({ onRadiusChange }) {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onRadiusChange(newValue); // Call the onRadiusChange function with the new value
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Slider
        value={value}
        onChange={handleChange}
        min={1}
        max={100}
        sx={{ flex: 1 }}
      />

      <Typography variant="body1" sx={{ paddingLeft: 1, paddingRight: 1 }}>
        {value} km
      </Typography>
    </Box>
  );
}

export default ContinuousSlider;
