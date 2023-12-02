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
import LaborType from './option/labor-type';
import Vendor from './option/vendor';
import JobService from './option/job-service';

const SiteOption: React.FC = () => {
  document.title = 'World of Floors - Site Option';
  const views = {
    0: 'Floor Type',
    1: 'Labor Type',
    2: 'Job Service',
    3: 'Color',
    4: 'Priority',
    5: 'Reference',
    6: 'Vendor',
    7: 'US States'
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
        {Object.keys(views).map(i => <Tab label={views[i]}/>)}
      </Tabs>

      {views[index] === 'Floor Type' && <FloorType />}
      {views[index] === 'Labor Type' && <LaborType />}
      {views[index] === 'Job Service' && <JobService />}
      {views[index] === 'Color' && <Color />}
      {views[index] === 'Priority' && <Priority />}
      {views[index] === 'Reference' && <Reference />}
      {views[index] === 'US States' && <USStates />}
      {views[index] === 'Vendor' && <Vendor />}

    </Container>
  );
};

export default SiteOption;