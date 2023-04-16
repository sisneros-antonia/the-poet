import React from 'react';
import Box from '@mui/material/Box';

export default function Results({ results }) {
  return (
    <Box
      sx={{ m: 2 }}
    >
      <pre>
        {JSON.stringify(results, null, 2)}
      </pre>
    </Box>
  )
}
