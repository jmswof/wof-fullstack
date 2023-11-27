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

const CostRate: React.FC = () => {
  document.title = 'World of Floors - Costs and Rates';
  const views = {
    0:'Labor Rates',
    1:'Product Costs',
    2:'Accessory Costs',
    3: 'Retail Prices',
    4:'Financing'
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

      {views[index] === 'Labor Rates' && <LaborRate />}
      {views[index] === 'Product Costs' && <ProductCost />}
      {views[index] === 'Accessory Costs' && <AccessoryCost />}
      {views[index] === 'Retail Prices' && <RetailPrice />}
      {views[index] === 'Financing' && <Financing />}

    </Container>
  );
};

export default CostRate;