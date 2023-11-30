import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import AccessoryCost from './pricing/accessory-cost';
import Financing from './pricing/financing';
import { useState } from 'react';

const CostRate: React.FC = () => {
  document.title = 'World of Floors - Costs and Rates';
  const views = {
    0: 'Accessory Costs',
    1: 'Financing'
  };

  const [index, setIndex] = useState(0);

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Costs and Rates</Typography>
      </Box>
      <Tabs value={index} onChange={(e, index) => {
        setIndex(index);
      }}>
        { Object.keys(views).map(view => <Tab key={view} label={views[view]} />) }
      </Tabs>

      {views[index] === 'Accessory Costs' && <AccessoryCost />}
      {views[index] === 'Financing' && <Financing />}

    </Container>
  );
};

export default CostRate;