import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import FloorType from './option/floor-type';
import Reference from './option/reference';
import Color from './option/color';
import Priority from './option/priority';
import USStates from './option/us-states';
import { useState } from 'react';

const SiteOption: React.FC = () => {
  document.title = 'World of Floors - Site Option';
  const views = {
    0:'Floor Type',
    1:'Reference',
    2:'Color',
    3:'Priority',
    4:'US States'
  };

  const [index, setIndex] = useState(0);

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Site Option</Typography>
      </Box>
      <Tabs value={index} onChange={(e, index) => {
        setIndex(index);
      }}>
        <Tab label='Floor Type' />
        <Tab label='Reference' />
        <Tab label='Color' />
        <Tab label='Priority' />
        <Tab label='US States' />
      </Tabs>

      {views[index] === 'Floor Type' && <FloorType />}
      {views[index] === 'Reference' && <Reference />}
      {views[index] === 'Color' && <Color />}
      {views[index] === 'Priority' && <Priority />}
      {views[index] === 'US States' && <USStates />}

    </Container>
  );
};

export default SiteOption;