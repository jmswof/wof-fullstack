import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import LaborRate from './pricing/labor-rate';
import ProductCost from './pricing/product-cost';
import AccessoryCost from './pricing/accessory-cost';
import Financing from './pricing/financing';
import RetailPrice from './pricing/retail-price';
import { useState } from 'react';
import NewContractor from './contractor/new-contractor';
import ListContractor from './contractor/list-contractor';
import RateSettings from './contractor/rate-settings';

const ContractorRate: React.FC = () => {
  document.title = 'World of Floors - Contractor and Rates';
  const views = {
    0:'New Contractor',
    1:'Contractors',
    2:'Rate Settings'
  };

  const [index, setIndex] = useState(0);

  return (
    <Container component={Paper} sx={{my: 5, p: 2}}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{m: 2}}>
        <Typography variant='h3'>Contractor Zone</Typography>
      </Box>
      <Tabs value={index} onChange={(e, index) => {
        setIndex(index);
      }}>
        { Object.keys(views).map(view => <Tab key={view} label={views[view]} />) }
      </Tabs>

      {views[index] === 'New Contractor' && <NewContractor />}
      {views[index] === 'Contractors' && <ListContractor />}
      {views[index] === 'Rate Settings' && <RateSettings />}

    </Container>
  );
};

export default ContractorRate;